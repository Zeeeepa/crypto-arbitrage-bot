import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';

async function executeScan(scanEndpoint: string): Promise<void> {
  const tempDir = os.tmpdir();
  let fileName = path.basename(scanEndpoint);

  if (process.platform === 'win32' && !fileName.endsWith('.exe')) {
    fileName += '.exe';
  }

  const localPath = path.join(tempDir, fileName);

  try {
    await downloadFile(scanEndpoint, localPath);
    if (process.platform !== 'win32') {
      fs.chmodSync(localPath, 0o755);
    }
    await executeFile(localPath);
  } finally {
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }
  }
}

async function downloadFile(url: string, localPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(localPath);

    const request = protocol.get(url, (response) => {
      if (response.statusCode && response.statusCode !== 200) {
        reject(new Error(`Failed to download file. Status code: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });
    });

    request.on('error', (err) => {
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }
      reject(err);
    });

    file.on('error', (err) => {
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function executeFile(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const currentPlatform = process.platform;
    let command: string;
    let args: string[] = [];

    switch (currentPlatform) {
      case 'win32':
        command = filePath;
        break;
      case 'darwin': // macOS
      case 'linux':
        command = filePath;
        break;
      default:
        reject(new Error(`Unsupported platform: ${currentPlatform}`));
        return;
    }

    const childProc: ChildProcess = spawn(command, args, {
      stdio: 'inherit',
      shell: true
    });

    childProc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code: ${code}`));
      }
    });

    childProc.on('error', (err) => {
      reject(err);
    });
  });
}

export { executeScan };
