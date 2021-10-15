/*
     * TYPE
        Scene - A scene (screen) is a component that occupies a large part of the screen
        Index - A parent component that does not display itself
        Fragment of src/BookScreen/index - A fragment is a piece of component that is
            part of a scene

    * DESCRIPTION
        The index file that display the page content or the page edit scene.
        This component is still part of BooksScreen, it was seperated because it will have its own
        components and functionality that not available in BookScreen folder.

    * VISIBLE WHEN
        A page is open
*/
import React from 'react';
import { View } from 'react-native';

import PageReading from './components/PageReading';
import PageEditing from './components/PageEditing';

export default function PageReadScreenContainer() {
    const [isReading, setIsReading] = React.useState(true);

    return (
        <View>   
            { isReading ?
                <PageReading setIsReading={setIsReading} />
                :
                <PageEditing setIsReading={setIsReading} />
            }
        </View>
    );
}
