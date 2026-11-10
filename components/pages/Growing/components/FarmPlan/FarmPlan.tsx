import styles from "./FarmPlan.module.css";

const PLOT_W = 206;
const PLOT_H = 51;
const BLOCK_TOP = 100;
const W_LEFT = 128;
const E_LEFT = W_LEFT + PLOT_W + 10;

const BUILT_PLOTS = ["W1", "W2"];

const rows = Array.from({ length: 9 }, (_, index) => ({
  number: index + 1,
  y: BLOCK_TOP + (8 - index) * PLOT_H,
}));

const hives = [4, 3, 2, 1, 0].flatMap((row, rowIndex) =>
  [0, 1].map((column) => ({
    key: `hive-${row}-${column}`,
    x: 460 + column * 26,
    y: 620 + row * 30,
    built: rowIndex === 0,
  })),
);

type PlotProps = {
  x: number;
  y: number;
  label: string;
};

const Plot = ({ x, y, label }: PlotProps) => {
  const built = BUILT_PLOTS.includes(label);

  return (
    <>
      <rect
        className={built ? styles.built : styles.planned}
        x={x}
        y={y}
        width={PLOT_W}
        height={PLOT_H}
      />
      <text
        className={built ? styles.builtLabel : styles.plannedLabel}
        x={x + PLOT_W / 2}
        y={y + PLOT_H / 2 + 4}
        textAnchor="middle"
      >
        {label}
      </text>
    </>
  );
};

export const FarmPlan = () => (
  <svg
    className={styles.plan}
    viewBox="0 0 660 930"
    role="img"
    aria-labelledby="farm-plan-title farm-plan-description"
  >
    <title id="farm-plan-title">Grit And Grow Farm layout, years 1 to 10</title>
    <desc id="farm-plan-description">
      A plan of the farm showing eighteen growing plots in two blocks, a
      garden, a greenhouse, a field house, and ten bee hives. Two plots, the
      garden and two hives are in the ground. Everything else is planned.
    </desc>

    <text className={styles.title} x={20} y={34}>
      Farm layout, years 1 to 10
    </text>

    <path
      className={styles.road}
      d="M20,60 L580,60 L580,840 L130,840 Z M43,80 L560,80 L560,820 L147.4,820 Z"
      fillRule="evenodd"
    />
    <polygon className={styles.boundary} points="20,60 580,60 580,840 130,840" />
    <polygon className={styles.inner} points="43,80 560,80 560,820 147.4,820" />
    <text className={styles.label} x={300} y={74} textAnchor="middle">
      outer road
    </text>

    {rows.map(({ number, y }) => (
      <Plot key={`w-${number}`} x={W_LEFT} y={y} label={`W${number}`} />
    ))}
    {rows.map(({ number, y }) => (
      <Plot key={`e-${number}`} x={E_LEFT} y={y} label={`E${number}`} />
    ))}

    <rect className={styles.planned} x={165} y={600} width={60} height={60} />
    <text className={styles.plannedLabel} x={195} y={674} textAnchor="middle">
      greenhouse
    </text>

    <rect className={styles.built} x={165} y={695} width={64} height={96} />
    <text className={styles.builtLabel} x={197} y={747} textAnchor="middle">
      garden
    </text>

    <rect className={styles.planned} x={300} y={640} width={40} height={120} />
    <text
      className={styles.plannedLabel}
      x={320}
      y={704}
      textAnchor="middle"
      transform="rotate(-90 320 704)"
    >
      field house
    </text>

    {hives.map(({ key, x, y, built }) => (
      <rect
        key={key}
        className={built ? styles.hiveBuilt : styles.hivePlanned}
        x={x}
        y={y}
        width={12}
        height={10}
      />
    ))}
    <text className={styles.label} x={448} y={690} textAnchor="end">
      hives
    </text>
    <text className={styles.small} x={448} y={704} textAnchor="end">
      drawn oversize
    </text>

    <rect className={styles.built} x={20} y={876} width={16} height={11} />
    <text className={styles.label} x={44} y={885}>
      in the ground
    </text>
    <rect className={styles.planned} x={150} y={876} width={16} height={11} />
    <text className={styles.label} x={174} y={885}>
      planned
    </text>

    <g transform="translate(572,888)">
      <line className={styles.compassLine} x1={0} y1={-20} x2={0} y2={20} />
      <line className={styles.compassLine} x1={-20} y1={0} x2={20} y2={0} />
      <polygon className={styles.compassArrow} points="0,-26 5,-13 0,-16 -5,-13" />
      <text className={styles.compassLabel} x={0} y={-30} textAnchor="middle">
        N
      </text>
      <text className={styles.compassMinor} x={30} y={4} textAnchor="middle">
        E
      </text>
      <text className={styles.compassMinor} x={0} y={34} textAnchor="middle">
        S
      </text>
      <text className={styles.compassMinor} x={-30} y={4} textAnchor="middle">
        W
      </text>
    </g>
  </svg>
);
