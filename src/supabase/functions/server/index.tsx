import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Projects endpoints
app.get('/make-server-036a5a33/projects', async (c) => {
  try {
    const projects = await kv.getByPrefix('project:');
    return c.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post('/make-server-036a5a33/projects', async (c) => {
  try {
    const body = await c.req.json();
    const projectId = `project:${Date.now()}`;
    
    const project = {
      id: projectId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(projectId, project);
    return c.json({ success: true, data: project });
  } catch (error) {
    console.error('Error creating project:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put('/make-server-036a5a33/projects/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existing = await kv.get(id);
    if (!existing) {
      return c.json({ success: false, error: 'Project not found' }, 404);
    }
    
    const updated = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(id, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating project:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Tasks endpoints
app.get('/make-server-036a5a33/tasks', async (c) => {
  try {
    const tasks = await kv.getByPrefix('task:');
    return c.json({ success: true, data: tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post('/make-server-036a5a33/tasks', async (c) => {
  try {
    const body = await c.req.json();
    const taskId = `task:${Date.now()}`;
    
    const task = {
      id: taskId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(taskId, task);
    return c.json({ success: true, data: task });
  } catch (error) {
    console.error('Error creating task:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put('/make-server-036a5a33/tasks/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existing = await kv.get(id);
    if (!existing) {
      return c.json({ success: false, error: 'Task not found' }, 404);
    }
    
    const updated = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(id, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating task:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Meetings endpoints
app.get('/make-server-036a5a33/meetings', async (c) => {
  try {
    const meetings = await kv.getByPrefix('meeting:');
    return c.json({ success: true, data: meetings });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post('/make-server-036a5a33/meetings', async (c) => {
  try {
    const body = await c.req.json();
    const meetingId = `meeting:${Date.now()}`;
    
    const meeting = {
      id: meetingId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(meetingId, meeting);
    return c.json({ success: true, data: meeting });
  } catch (error) {
    console.error('Error creating meeting:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Risks endpoints
app.get('/make-server-036a5a33/risks', async (c) => {
  try {
    const risks = await kv.getByPrefix('risk:');
    return c.json({ success: true, data: risks });
  } catch (error) {
    console.error('Error fetching risks:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post('/make-server-036a5a33/risks', async (c) => {
  try {
    const body = await c.req.json();
    const riskId = `risk:${Date.now()}`;
    
    const risk = {
      id: riskId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(riskId, risk);
    return c.json({ success: true, data: risk });
  } catch (error) {
    console.error('Error creating risk:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put('/make-server-036a5a33/risks/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existing = await kv.get(id);
    if (!existing) {
      return c.json({ success: false, error: 'Risk not found' }, 404);
    }
    
    const updated = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(id, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating risk:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Team members endpoints
app.get('/make-server-036a5a33/team', async (c) => {
  try {
    const members = await kv.getByPrefix('team:');
    return c.json({ success: true, data: members });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post('/make-server-036a5a33/team', async (c) => {
  try {
    const body = await c.req.json();
    const memberId = `team:${Date.now()}`;
    
    const member = {
      id: memberId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(memberId, member);
    return c.json({ success: true, data: member });
  } catch (error) {
    console.error('Error creating team member:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Initialize sample data
app.post('/make-server-036a5a33/init-sample-data', async (c) => {
  try {
    // Check if data already exists
    const existingProjects = await kv.getByPrefix('project:');
    if (existingProjects.length > 0) {
      return c.json({ success: true, message: 'Sample data already exists' });
    }

    // Sample projects
    const projects = [
      {
        id: 'project:1',
        name: 'Refonte plateforme digitale',
        description: 'Modernisation complète de l\'interface utilisateur et migration vers React',
        progress: 67,
        status: 'on-track',
        priority: 'high',
        startDate: '2025-11-01',
        deadline: '2026-03-15',
        budget: { used: 125000, total: 180000 },
        team: ['JD', 'ML', 'AC', 'PL'],
        objectives: [
          { name: 'UX/UI Design', progress: 100 },
          { name: 'Développement Frontend', progress: 75 },
          { name: 'Intégration API', progress: 50 },
          { name: 'Tests & Validation', progress: 25 },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'project:2',
        name: 'Migration infrastructure cloud',
        description: 'Migration des serveurs vers AWS avec architecture microservices',
        progress: 45,
        status: 'at-risk',
        priority: 'high',
        startDate: '2025-10-15',
        deadline: '2026-02-28',
        budget: { used: 89000, total: 150000 },
        team: ['JD', 'TS', 'KB'],
        objectives: [
          { name: 'Audit infrastructure', progress: 100 },
          { name: 'Architecture technique', progress: 80 },
          { name: 'Migration données', progress: 30 },
          { name: 'Tests de charge', progress: 0 },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    for (const project of projects) {
      await kv.set(project.id, project);
    }

    return c.json({ success: true, message: 'Sample data initialized' });
  } catch (error) {
    console.error('Error initializing sample data:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
