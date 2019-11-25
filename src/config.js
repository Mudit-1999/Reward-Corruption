const glossary = {
	N: {
		label: 'N',
		description: 'Dimensions of gridworld',
	},
	freq: {
		label: 'Theta',
		description: 'Frequency that the dispenser dispenses rewards',
	},
	steps: {
		label: 'Steps',
		description: 'Number of steps to run the simulation for (you can stop the simulation early)',
	},
	gamma: {
		label: 'Gamma',
		description: 'Geometric discount rate',
	},
	ucb: {
		label: 'UCB',
		description: 'Upper Confidence Bound parameter for Monte-carlo Tree Search planning',
	},
	samples: {
		label: 'MCTS Samples',
		description: 'Number of samples to use in Monte-Carlo Tree Search',
	},
	horizon: {
		label: 'Horizon',
		description: `Agent's planning horizon`,
	},
};

const configs = {
	
	reward_corruption: {
		active: true,
		name: 'Reward Corruption',
		description: `Agent encounters some true and corrupt reward tiles.`,
		vis: RewardCorruptionVis,
		nolivevis: true,
		agent: {
			agents: { QLearn, SARSA, SoftQLearn, Quantiliser },
			type: QLearn,
			alpha: 0.1,
			gamma: 0.9,
			epsilon: 0.1,
			delta: 0.5,
			beta: 2,
			_tracer: RewardCorruptionTrace,
			_random: true,
		},
		env: {
			type: Gridworld,
			N: 5,
			wallProb: 0.01,
			goals: [{ freq: 1 }, { freq: 1 }, { freq: 1 }, { freq: 1 },],
			rewards: { chocolate: 0.9, wall: 0, empty: 0.1, move: 0, modifier: 1 },
			initialQ: 10,
			state_percepts: true,
			_set_seed: true,
			_mods: function (env) {
				let pos = Gridworld.proposeGoal(env.options.N);
				let t = env.grid[pos.x][pos.y];
				if (t.expanded) {
					t = new SelfModificationTile(t.x, t.y, 1);
					env.grid[pos.x][pos.y] = t;
					env.options.map[pos.y][pos.x] = 'M';
				} else {
					this._mods(env);
				}
				env.generateConnexions();
			},
		},
	},
	reward_corruption_experiments: {
		name: 'Reward Corruption Experiments',
		description: `Agent encounters some true and corrupt reward tiles.`,
		vis: RewardCorruptionVis,
		agent: {
			type: Quantiliser,
			alpha: 0.1,
			gamma: 0.9,
			epsilon: 0.1,
			delta: 0.5,
			beta: 2,
			_tracer: RewardCorruptionTrace,
			_random: true,
		},
		env: {
			type: Gridworld,
			N: 5,
			wallProb: 0.01,
			goals: [{ freq: 1 }, { freq: 1 }, { freq: 1 }, { freq: 1 },],
			rewards: { chocolate: 0.9, wall: 0, empty: 0.1, move: 0, modifier: 1 },
			initialQ: 10,
			state_percepts: true,
			_set_seed: true,
			_mods: function (env) {
				let pos = Gridworld.proposeGoal(env.options.N);
				let t = env.grid[pos.x][pos.y];
				if (t.expanded) {
					t = new SelfModificationTile(t.x, t.y, 1);
					env.grid[pos.x][pos.y] = t;
					env.options.map[pos.y][pos.x] = 'M';
				} else {
					this._mods(env);
				}
				env.generateConnexions();
			},
		},
	},
};
