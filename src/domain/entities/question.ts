
import {Slug} from "@/domain/entities/value-objects/slug";
import {Entity} from "@/core/entities/entity";




interface questionProps{
    title:string,
    content:string,
    slug:Slug,
    authorId:string,

}

export class Question extends Entity<questionProps>{

}