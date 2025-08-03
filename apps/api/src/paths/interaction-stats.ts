import { Request, Response } from 'express';
import { Operation } from 'express-openapi';
import { sequelize } from '../service/sequelize';

const interactionStatsQuery = sequelize.query(
  `
      SELECT 
        DATE(i.created_at) as interaction_date,
        a.name as agent_name,
        i.id as interaction_id,
        i.length_seconds
      FROM Interactions i
      JOIN Agents a ON i.agent_id = a.id
      ORDER BY i.created_at DESC, a.name ASC
    `
);

export const GET: Operation = async (req: Request, res: Response) => {
  const interactionStats = await interactionStatsQuery;

  return res.send({ data: interactionStats });
};

GET.apiDoc = {
  description: 'Fetches interaction stats',
  operationId: 'interactionStats',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: {
            properties: {
              data: {
                type: 'array',
                items: {
                  properties: {
                    interaction_date: {
                      type: 'string',
                      format: 'date',
                    },
                    agent_name: {
                      type: 'string',
                    },
                    interaction_id: {
                      type: 'string',
                    },
                    length_seconds: {
                      type: 'number',
                    },
                  },
                  type: 'object',
                },
              },
            },
            required: ['data'],
            type: 'object',
          },
        },
      },
      description: 'Interaction stats',
    },
  },
};
