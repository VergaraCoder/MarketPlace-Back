import { Role } from "src/role/entities/role.entity";
import { DataSource, Repository } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

interface DataRole{
    name:string;
}

export class SeederRole implements Seeder{
    async run(dataSource: DataSource): Promise<any> {
        const repoRole:Repository<Role>=dataSource.getRepository("roles");
        const dataRole:DataRole[]=[
            {name:"seller"},
            {name:"buyer"},
        ];

        for(const roleName of dataRole){
            const query:Role | null = await repoRole.findOneBy({name:roleName.name});
            if(!query){
                const role:Role= repoRole.create(roleName);
                await repoRole.save(role);
            }
        }
    }
}