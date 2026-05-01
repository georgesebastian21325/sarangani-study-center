const TABLE_HEADINGS = [
  'Resident',
  'Breakfast',
  'Lunch',
  'Merienda',
  'Supper',
  'Completion',
  'Action',
];

export const ResidentTableHead = () => (
  <thead>
    <tr
      style={{
        background: 'rgba(90,10,30,0.025)',
        borderBottom: '1px solid #e8dece',
      }}
    >
      {TABLE_HEADINGS.map((heading, index) => (
        <th
          key={heading}
          className="od-cinzel"
          style={{
            fontSize: '7.5px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '10px 16px',
            fontWeight: 500,
            color: '#9c856a',
            textAlign: index >= 5 ? 'center' : 'left',
          }}
        >
          {heading}
        </th>
      ))}
    </tr>
  </thead>
);

