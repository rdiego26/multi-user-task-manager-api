/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    const SQL = `
		create table IF NOT EXISTS "task"
			(
					id uuid not null
						constraint "PK_task"
							primary key,
					description varchar(200) not null,
					project_id uuid not null
						constraint fk_task_project
						references "project",
					created_at timestamp with time zone default now() not null,
					finished_at timestamp with time zone
			);
	`;
    pgm.sql(SQL);
};

exports.down = pgm => {
    const SQL = `
			DROP TABLE IF EXISTS "task";
    `;
    pgm.sql(SQL);
};
