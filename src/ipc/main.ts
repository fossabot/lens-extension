import { Main } from "@k8slens/extensions";
import { IpcRendererEvent } from "@k8slens/extensions/dist/src/extensions/common-api/types";
import { KubescapeApi } from '@kubescape/install'
import { Logger } from "../utils/logger";
import { LensUI } from "../kubescape/ui";
import { SCAN_CLUSTER_EVENT_NAME } from "../utils/consts";

export class IpcMain extends Main.Ipc {
    constructor(extension: Main.LensExtension) {
        super(extension);
        this.handle(SCAN_CLUSTER_EVENT_NAME, onScanCluster);
    }
}

async function onScanCluster(event: IpcRendererEvent, clusterName: string) {
    Logger.debug(`Received scan cluster event for '${clusterName}'`);
    const kubescapeApi = KubescapeApi.instance
    const result = await kubescapeApi.scanCluster(new LensUI , clusterName);
    Logger.debug(`Scan completed for cluster ${clusterName}`);
    return result;
}
