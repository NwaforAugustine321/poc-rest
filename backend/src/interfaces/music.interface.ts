export interface ICreateMusic {
  title: string;
  artist: string;
  year: string;
  userId: string;
  web_url: string;
  image_url: string;
}


export interface ISubscribeToMusic {
  userId: string;
  musicId:string
}

export interface IGetMusic {
  title: string | any;
  artist: string | any;
  year: string | any;
}


