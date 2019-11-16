module.exports = {
    name: "clear",
    aliases: ["Purge", "nuke"],
    category: "moderation",
    description: "Clears the chat",
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Look's like you cannot use that command...").then(m => m.delete(5000));
        }
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Woops, that isn't a number. I cannot delete 0 message by the way,").then(m => m.delete(5000));
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Look's like i do not have permissions to delete messages, please make sure i have the ``Manage Messages`` permission.").then(m => m.delete(5000));
        }

        let deleteamount;

        if (parseInt(args[0]) > 100) {
            deleteamount = 100;
        } else {
            deleteamount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteamount, true)
        .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`)).then(m => m.delete(10000))
        .catch(err => message.reply(`something went wrong... ${err}`));
    }
}