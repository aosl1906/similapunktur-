import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function curationSavePlugin() {
  return {
    name: 'curation-save-middleware',
    configureServer(server: any) {
      const repoRoot = path.resolve(__dirname, '..');
      const overridesPath = path.join(repoRoot, 'curation_overrides.json');
      const publicSimilaPath = path.join(__dirname, 'public', 'similapunktur.json');
      const outSimilaPath = path.join(repoRoot, 'out', 'similapunktur.json');
      const publicBoerickePath = path.join(__dirname, 'public', 'boericke_repertory.json');
      const outBoerickePath = path.join(repoRoot, 'out', 'boericke_repertory.json');

      server.middlewares.use('/api/curation/overrides', (req: any, res: any, next: any) => {
        if (req.method !== 'GET') return next();
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if (fs.existsSync(overridesPath)) {
          res.end(fs.readFileSync(overridesPath, 'utf-8'));
        } else {
          res.end('{}');
        }
      });

      server.middlewares.use('/api/curation/save', (req: any, res: any, next: any) => {
        if (req.method !== 'POST') return next();
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const payload = JSON.parse(body || '{}');

            if (payload.overrides !== undefined) {
              fs.writeFileSync(overridesPath, JSON.stringify(payload.overrides, null, 2), 'utf-8');
            }

            if (payload.updatedPoint && payload.updatedPoint.point_id) {
              const pts = JSON.parse(fs.readFileSync(publicSimilaPath, 'utf-8'));
              const idx = pts.findIndex((p: any) => p.point_id === payload.updatedPoint.point_id);
              if (idx >= 0) {
                pts[idx] = payload.updatedPoint;
                const serialized = JSON.stringify(pts, null, 2);
                fs.writeFileSync(publicSimilaPath, serialized, 'utf-8');
                if (fs.existsSync(path.dirname(outSimilaPath))) {
                  fs.writeFileSync(outSimilaPath, serialized, 'utf-8');
                }
              }
            }

            if (payload.updatedBoerickeRubric && payload.updatedBoerickeRubric.full_path) {
              const bData = JSON.parse(fs.readFileSync(publicBoerickePath, 'utf-8'));
              const targetPath = payload.updatedBoerickeRubric.original_full_path || payload.updatedBoerickeRubric.full_path;
              const idx = bData.rubrics.findIndex((r: any) => r.full_path === targetPath);
              if (idx >= 0) {
                const updated = { ...bData.rubrics[idx], ...payload.updatedBoerickeRubric.rubric };
                bData.rubrics[idx] = updated;
                const serialized = JSON.stringify(bData);
                fs.writeFileSync(publicBoerickePath, serialized, 'utf-8');
                if (fs.existsSync(path.dirname(outBoerickePath))) {
                  fs.writeFileSync(outBoerickePath, serialized, 'utf-8');
                }
              }
            }

            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ ok: true }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ ok: false, error: err?.message || 'Save failed' }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  root: '.',
  base: './',
  plugins: [curationSavePlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
});
