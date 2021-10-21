/*
    Handle when the an export file is requested.
    This will just download the file.

    The storageKey parameter points to the stored key of the async storage.
    This function will be used by ShelfScreen and so, it does not load
    current state.shelf content.
*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageAccessFramework, EncodingType } from 'expo-file-system';
import CommonAction from './Common';

interface Message {
    message :string;
    newfile :boolean;
    error   :boolean;
}

export default async function ExportAFile(filename :string, storagekey :string) :Promise<Message> {
    try {
        await CommonAction.init();
        const data :any  = await AsyncStorage.getItem(storagekey);
        const dir = StorageAccessFramework.getUriForDirectoryInRoot(CommonAction.getHomeDirectorty());
        const dirname = dir.substring( dir.lastIndexOf(':') + 1, dir.length).trim();

        //check if the file exist
        const files :Array<string> = await StorageAccessFramework.readDirectoryAsync(dir);
        let exist       = false;
        let existpath   = '';
        files.map((file :string) => {
            const ext   = file.substring( file.lastIndexOf('.') + 1, file.length).trim();
            const fname = file.substring( file.lastIndexOf('%') + 3, file.lastIndexOf('.')).trim();
            if( ext == 'cbf') {
                if(filename == fname) {
                    exist = true;
                    existpath = file;
                }
            }
        });
        if(!exist) {
            const uri = await StorageAccessFramework.createFileAsync(dir, filename + '.cbf', 'text/cbf');
            await StorageAccessFramework.writeAsStringAsync(uri, data, {encoding: EncodingType.UTF8});
            return {
                message: `A new file was created in: "${dirname}"\nFile name: "${filename}.cbf"`,
                newfile: true,
                error: false
            }
        }
        else {
            await StorageAccessFramework.writeAsStringAsync(existpath, data, {encoding: EncodingType.UTF8});
            return {
                message: `Replaced the content of "${filename}.cbf" at "${dirname}" directory.`,
                newfile: false,
                error: false
            }
        }
    }
    catch(err) {
        return {
            message: `Can't perform export. ` + err,
            newfile: false,
            error: true
            }
    }
}
