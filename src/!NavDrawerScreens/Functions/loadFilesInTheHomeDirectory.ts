/*
    Return an Array of ContentFile which contain files (.cbf) that is available in the
    current home directory.
*/
import ContentFile from './interface';
import { StorageAccessFramework } from 'expo-file-system';
import CommonNav from './Common';

export default async function loadFilesInTheHomeDirectory() :Promise<ContentFile[]> {
    const downloadir :string   = await StorageAccessFramework.getUriForDirectoryInRoot(CommonNav.getHomeDirectorty());
    const files :Array<string> = await StorageAccessFramework.readDirectoryAsync(downloadir);
    let cbffiles :Array<ContentFile> = [];
    files.map((file :string) => {
        const ext   = file.substring( file.lastIndexOf('.') + 1, file.length).trim();
        const fname = file.substring( file.lastIndexOf('%') + 3, file.lastIndexOf('.')).trim();
        if( ext == 'cbf' ) 
            cbffiles.push({
                name: fname,
                path: file,
            });
    });
    return cbffiles
};