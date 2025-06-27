const fs = require('fs');
const vm = require('vm');
const path = require('path');

// Read the raw contents of instruments_symbols.js
const code = fs.readFileSync(path.join(__dirname, 'instruments_symbols.js'), 'utf-8');

// Create a sandboxed context
const context = { instruments: null };
vm.createContext(context);

// Run the code and expose 'instruments' to the context
vm.runInContext(`${code}\nthis.instruments = instruments;`, context);

// Get the instruments array
const instruments = context.instruments;

if (!Array.isArray(instruments)) {
  console.error("Instruments data is not a valid array.");
  process.exit(1);
}

/**
 * Reads the imported 'instruments' array and generates a complete SQL file
 * with an INSERT statement for each instrument.
 * @param {string} outputSqlPath - The path to save the output SQL file.
 */
function generateInsertQueries(outputSqlPath) {
  try {
    console.log(`Found ${instruments.length} instruments to process.`);

    const sqlFileStream = fs.createWriteStream(outputSqlPath, { encoding: 'utf-8' });

    instruments.forEach(item => {
      const instrument_token = item.instrument_token || 'NULL';
      const name = item.name ? `'${item.name.replace(/'/g, "''")}'` : 'NULL';
      const tradingsymbol = item.tradingsymbol ? `'${item.tradingsymbol}'` : 'NULL';
      const underlying_instrument = item.underlying_instrument ? `'${item.underlying_instrument}'` : 'NULL';
      const expiry = item.expiry ? `'${item.expiry}'` : 'NULL';
      const strike = item.strike !== undefined ? item.strike : 'NULL';
      const tick_size = item.tick_size !== undefined ? item.tick_size : 'NULL';
      const lot_size = item.lot_size !== undefined ? item.lot_size : 'NULL';
      const multiplier = item.multiplier !== undefined ? item.multiplier : 'NULL';
      const is_underlying = item.is_underlying ? 1 : 0;
      const is_non_fno = item.is_non_fno ? 1 : 0;
      const tradable = item.tradable ? 1 : 0;
      const broker = item.broker ? `'${item.broker}'` : 'NULL';
      const mode = item.mode ? `'${item.mode}'` : 'NULL';
      const exchange = item.exchange ? `'${item.exchange}'` : 'NULL';
      const segment = item.segment ? `'${item.segment}'` : 'NULL';
      const instrument_type = item.instrument_type ? `'${item.instrument_type}'` : 'NULL';
      const last_price = item.last_price !== undefined ? item.last_price : 'NULL';
      const last_quantity = item.last_quantity !== undefined ? item.last_quantity : 'NULL';
      const volume = item.volume !== undefined ? item.volume : 'NULL';
      const oi = item.oi !== undefined ? item.oi : 'NULL';
      const last_updated_at = item.last_updated_at ? `'${item.last_updated_at}'` : 'NULL';
      const last_traded_timestamp = item.last_traded_timestamp || 'NULL';
      const sectors_json = Array.isArray(item.sectors) ? `'${JSON.stringify(item.sectors)}'` : 'NULL';

      const query = `INSERT INTO \`sensibull_all_instrument\` (\`instrument_token\`, \`name\`, \`tradingsymbol\`, \`underlying_instrument\`, \`expiry\`, \`strike\`, \`tick_size\`, \`lot_size\`, \`multiplier\`, \`is_underlying\`, \`is_non_fno\`, \`tradable\`, \`broker\`, \`mode\`, \`exchange\`, \`segment\`, \`instrument_type\`, \`last_price\`, \`last_quantity\`, \`volume\`, \`oi\`, \`last_updated_at\`, \`last_traded_timestamp\`, \`sectors\`) VALUES (${instrument_token}, ${name}, ${tradingsymbol}, ${underlying_instrument}, ${expiry}, ${strike}, ${tick_size}, ${lot_size}, ${multiplier}, ${is_underlying}, ${is_non_fno}, ${tradable}, ${broker}, ${mode}, ${exchange}, ${segment}, ${instrument_type}, ${last_price}, ${last_quantity}, ${volume}, ${oi}, ${last_updated_at}, ${last_traded_timestamp}, ${sectors_json});\n`;

      sqlFileStream.write(query);
    });

    sqlFileStream.end();
    console.log(`Successfully created SQL file: '${outputSqlPath}'`);

  } catch (e) {
    console.error(`An error occurred: ${e.message}`);
  }
}

// Run from CLI
if (require.main === module) {
  console.log("Generating SQL file...");
  const outputFilePath = path.join(__dirname, 'inserts.sql');
  generateInsertQueries(outputFilePath);
}