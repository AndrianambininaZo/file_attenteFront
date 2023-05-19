export interface ListeReception {
    id: number;
    dateReception: Date;
    operationEntree: {
        id: 1,
        description: string,
        codeTache: string,
        status: string,
        priority: string,
        dateOperation: Date,
        fileName: string,
        extDoc: string,
        extAud: string,
        appUser: {
            id: number,
            nom: string,
            email: string,
            status: string,
            role: string,
        }
    };
    appUser: {
        id: number,
        nom: string,
        email: string,
        status: string,
        role: string,
    }


}
