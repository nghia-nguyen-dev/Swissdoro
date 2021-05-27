export const getMinutes = (time:number) =>
	Math.floor(time / 60) < 10
		? "0" + String(Math.floor(time / 60))
		: String(Math.floor(time / 60));

export const getSeconds = (time:number) => time % 60 < 10 ? "0" + String(time % 60) : String(time % 60);
