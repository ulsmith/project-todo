import { Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';

const io = new Server({
	cors: {
		origin: "*",
	},
});

type User = {
	name: string;
};

type Note = {
	id: string;
	title: string;
	description: string;
	color: string;
	author: string;
	posX: number;
	posY: number;
};

let users: User[] = [];
let notes: Note[] = [
	{ 
		title: 'Note 1',
		description: 'First simple note',
		color: 'green',
		id: '5c6848d8-da41-4560-a1f4-9c122d137d0e',
		author: 'Test',
		posX: 200,
		posY: 200
	},
	{ 
		title: 'Note 2',
		description: 'Another note to load',
		color: 'purple', 
		id: '79d7fde0-4e55-4473-81b7-191a3456e2e0',
		author: 'Test',
		posX: 400,
		posY: 400
	}
];

io.on("connection", (socket) => {
	// add a new user if not already present, then broadcast to all sessoins new user stack
	socket.on('add-user', (nUser: User) => {
		if (users.find((user) => user.name === nUser.name)) socket.emit('error', `Cannot add user, user ${nUser.name} already exists`);

		users.push(nUser);
		io.sockets.emit('update-users', users);
	});

	// add a new note, then broadcast to all sessions note stack
	socket.on('load-note', () => {
		io.sockets.emit('update-notes', notes);
	});

	// add a new note, then broadcast to all sessions note stack
	socket.on('add-note', (nNote: Note) => {
		notes.push({ ...nNote, id: uuidv4() });
		io.sockets.emit('update-notes', notes);
	});

	// remove a note, then broadcast to all sessions note stack
	socket.on('remove-note', (id: string) => {
		if (!notes.find((note) => note.id === id)) socket.emit('error', `Cannot remove note, note id ${id} does not exist`);

		notes = notes.filter((note) => note.id !== id);
		io.sockets.emit('update-notes', notes);
	});
});

io.listen(3000);
