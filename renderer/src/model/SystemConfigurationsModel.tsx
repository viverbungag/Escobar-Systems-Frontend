class SystemConfigurationsModel {

    voidPassword: string;
    numberOfTables: number;

    constructor(
        voidPassword: string,
        numberOfTables:number
    ) {
        this.voidPassword = voidPassword;
        this.numberOfTables = numberOfTables;
    }
}

export default SystemConfigurationsModel;