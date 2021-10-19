/*  
    Stored a common variables that is used accross Navigation Drawer screens.
    Added so there is no need for making its own local state api.
    It also manage its own AsyncStorage
*/
import AsyncStorage from '@react-native-async-storage/async-storage';

const Common = {
    homeDirectory: 'Download',
}

async function setCommonAsyncStorage() {
    await AsyncStorage.setItem('!NAVSCREENSDRAWERCOMMON', JSON.stringify(Common));
}

const CommonAction =  {
    init: async () => {
        const data = await AsyncStorage.getItem('!NAVSCREENSDRAWERCOMMON');
        if( data == null)
            await setCommonAsyncStorage();
        else {
            const temp = JSON.parse(data);
            Common.homeDirectory = temp.homeDirectory;
        }
    },
    setHomeDirectory: (dirname :string) :void => {
        Common.homeDirectory = dirname;
        setCommonAsyncStorage();
        
    },
    setHomeDirectoryFromURI: (contentpath :string) :void => {
        const dirname = contentpath.substring( contentpath.lastIndexOf('%3A') + 3, contentpath.length).trim();
        Common.homeDirectory = dirname;
        setCommonAsyncStorage();
    },
    getHomeDirectorty: () :string => {
        return Common.homeDirectory;
    },
}
export default CommonAction;
