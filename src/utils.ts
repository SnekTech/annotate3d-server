import { join } from 'path';

export function getAppDir() {
  return join(global.__baseDir, '../');
}

export function getTempDir() {
  return join(getAppDir(), 'db');
}

export function getModelsDir() {
  return join(getAppDir(), 'public/models');
}

export function getAnnotateProjectsDir() {
  return join(getAppDir(), 'public/annotate-projects');
}
