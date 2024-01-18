import { exec } from 'child_process';
import dotenv from 'dotenv';

interface Params {
  name: string;
  projectId?: string;
  region?: string;
  allowUnauthenticated?: boolean;
  entryPoint?: string;
  retry?: boolean;
  source?: string;
  trigger: {
    type: 'http';
  } | {
    type: 'topic';
    name: string;
  };
}

export const deployFunction = ({
  name, projectId, region, allowUnauthenticated,
  entryPoint, retry, source, trigger
}: Params) => {
  let command = `gcloud functions deploy ${name} --runtime=nodejs16`;
  const { parsed: envVars } = dotenv.config();

  if (projectId) command += ` --project=${projectId}`;
  if (region) command += ` --region=${region}`;
  if (allowUnauthenticated) command += ` --allowUnauthenticated`;
  if (entryPoint) command += ` --entry-point=${entryPoint}`;
  if (retry) command += ` --retry`;
  if (source) command += ` --source=${source}`;
  if (trigger.type === 'http') command += ` --trigger-http`;
  if (trigger.type === 'topic') command += ` --trigger-topic=${trigger.name}`;

  command += ` --set-env-vars=`;
  if (envVars && Object.keys(envVars).length > 0) {
    Object.entries(envVars).forEach(([key, value]) => {
      command += `${key}=${value},`;
    });
  }
  command += `NODE_ENV=production`;

  const process = exec(command);
  process.stdout?.on('data', data => {
    console.log(data.toString());
  });
  process.stderr?.on('data', data => {
    console.error(data.toString());
  });

};