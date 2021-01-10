## Capital

A desktop Electron-based app for personal finances and budgeting.

## Contributing

### Install Dependencies

```
$ cd capital
$ yarn
```

### Develop

```
# development mode
$ yarn dev

# production build
$ yarn build
```

A `capital.conf` is created in your home directory (e.g. on Windows, that's C:\Users\YourUserName\capital.conf). You can populate it with settings and the app will auto-read and update based on your config in realtime.

```
{
	titlebar: {
		title: 'Capital',
		background: '#fff',
		boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 0px 2px rgba(0,0,0,0.24)",
		transform: 'translateY(1px)',
		height: "30px",
		fontSize: '15px',
		titleHorizontalAlignment: 'left'
	},
	sidebar: {
		background: 'linear-gradient(#014CDB, #029BD8)',
	},
}
```
