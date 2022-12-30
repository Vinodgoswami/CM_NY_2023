import { _decorator, Component, resources, Asset, Prefab, AudioClip, error, VideoClip, SpriteFrame } from "cc";
const { ccclass } = _decorator;

//Loads all the resources on login.

@ccclass("ResourceUtils")
export class ResourceUtils extends Component {
    _musicFiles: AudioClip[] = [];
    _gameResource: Record<string, any> = {};
    public static _instance: ResourceUtils;

    start() {}

    public static getInstance() {
        if (!ResourceUtils._instance) {
            ResourceUtils._instance = new ResourceUtils();
        }
        return ResourceUtils._instance;
    }

    loadPrefabs(directoryName: string) {
        return new Promise((resolve, reject) => {
            if (this._gameResource[directoryName]) {
                resolve(this._gameResource[directoryName]);
            } else {
                resources.loadDir(directoryName, (err: Error | null, data: Asset[]) => {
                    if (err) {
                        reject(err);
                    } else {
                        this._gameResource[directoryName] = data;
                    }
                    resolve(this._gameResource[directoryName]);
                });
            }
        });
    }

    loadCards(directoryName: string) {
        return new Promise((resolve, reject) => {
            if (this._gameResource[directoryName]) {
                resolve(this._gameResource[directoryName]);
            } else {
                resources.loadDir(directoryName, (err: Error | null, data: Asset[]) => {
                    if (err) {
                        reject(err);
                    } else {
                        data = data.filter((element) => element.name.length != 0);
                        this._gameResource[directoryName] = data;
                    }
                    resolve(this._gameResource[directoryName]);
                });
            }
        });
    }

    loadVideo(directoryName: string) {
        return new Promise((resolve, reject) => {
            if (this._gameResource[directoryName]) {
                resolve(this._gameResource[directoryName]);
            } else {
                resources.loadDir(directoryName, (err: Error | null, data: Asset[]) => {
                    if (err) {
                        reject(err);
                    } else {
                        this._gameResource[directoryName] = data;
                    }
                    resolve(this._gameResource[directoryName]);
                });
            }
        });
    }

    public getVideo(folderName: string, name: string): VideoClip | undefined {
        if (this._gameResource[folderName]) {
            let videoClip: VideoClip | undefined = this._gameResource[folderName].find((videoClip) => videoClip.name == name);
            return videoClip;
        }
        return undefined;
    }

    public getPrefab(name: string): Prefab | undefined {
        if (this._gameResource["Prefabs"]) {
            let prefab: Prefab | undefined = this._gameResource["Prefabs"].find((prefab) => prefab.data.name == name);
            return prefab;
        }
        return undefined;
    }

    public getCard(name: string): SpriteFrame | undefined {
        if (this._gameResource["Textures/Cards"]) {
            let card: SpriteFrame | undefined = this._gameResource["Textures/Cards"].find((card) => card.name == name);
            return card;
        }
        return undefined;
    }

    public musicFiles() {
        return new Promise((resolve, reject) => {
            if (this._musicFiles.length > 0) {
                resolve(this._musicFiles);
            } else {
                resources.loadDir(`Music`, (err: Error | null, data: AudioClip[]) => {
                    if (err) {
                        reject(err);
                        error("load audio files :" + err);
                    } else {
                        this._musicFiles = data;
                    }
                    resolve(this._musicFiles);
                });
            }
        });
    }

    public getMusicFile(name: string) {
        if (this._musicFiles) {
            let clip = this._musicFiles.find((clip) => clip.name == name);
            return clip || null;
        }
    }
}
