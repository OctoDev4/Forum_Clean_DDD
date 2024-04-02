import {randomUUID} from "node:crypto";
import {UniqueEntityId} from "@/core/entities/unique-entity-id";

export class Entity<Props> {
    private _id: UniqueEntityId
    protected props: any

    get id() {
        return this._id
    }


    constructor(props: Props, id?: string) {
        this.props = props
        this._id = new UniqueEntityId(id)
    }
}