export type SpecificPostTyped = {
    content:string;
    authorId:number;
    durationRead:string;
    postImg:string;
    title:string;
    date:string;
    subTitle:string;
    
}

export type UserTyped = {
    email:string;
    firstName:string;
    lastName:string;
    userImg:string;
  
}


export type imageUrls ={
    data:{
        publicUrl:string;
    }
}