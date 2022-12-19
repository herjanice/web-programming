const makeName = (name, to) => { return [name, to].sort().join('_'); };

const Query = {
    chatbox: async (parent, { name1, name2 }, { ChatBoxModel }) => {
        if (!name1 || !name2) {
            return
        }
        const chatBoxName = makeName(name1, name2)
        let box = await ChatBoxModel.findOne({ name: chatBoxName });
        console.log("IN QUERY: ", box)
        if(!box)
            box = await new ChatBoxModel({ name: chatBoxName }).save();
        return box;
    },
};

export default Query;
  