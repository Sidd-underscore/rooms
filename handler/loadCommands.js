function loadCommands(client) {
  const fs = require("fs");
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Commands", "Load Status");
    
 const commandFiles = fs
      .readdirSync(`./commands/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
        
      const command = require(`../commands/${file}`);
      if (command.name) {
        client.commands.set(command.name, command);
        table.addRow(file, "✔️");
      } else {
        table.addRow(
          file,
          "❌ => Missing a help.name or help.name is not in string"
        );
        continue;
      }
      if (command.aliases && Array.isArray(command))
        command.aliases.forEach((alias) =>
          client.aliases.set(alias, command.name)
        );
    }
    console.log(table.toString());
  }


module.exports = {
  loadCommands,
};