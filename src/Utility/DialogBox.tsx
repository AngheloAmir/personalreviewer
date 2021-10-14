/*
    The parent dialog box. This component must be extend by providing a component to
    the props.dialogContent.

    Example usage:
        <DialogBoxWindow
            title='My Title'
            isshow={true}
            ok={() => console.log('You pressed OK')}
            cancel={() => console.log('You pressed Cancel')}
            dialogContent={() => return { (<Text>This the content of the dialog box</Text>) }}
        />
*/
import React from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { WindowDimension } from './useResponsive'; 

export interface propsReceive {
    title         :string;
    isshow        :boolean;
    ok?           :() => void; // at lease of them is available
    cancel?       :() => void; //
    dialogContent :any;
    isScrolledContent? :boolean;
}

export default function DialogBox( props :propsReceive ) {
    if(!props.isshow) return <View style={{position: 'absolute'}}></View>;

    //This state is use to set the top position of the dialog box after it is rendered (after height is calculated)
    //so it will appear in the middle of the screen
    //by default, the opacity is set to 0 so the repositioning of the dialog will not be notice by the user
    const [position, setPosition] = React.useState({opacity: 0, top: 0});
    const WIDTH = (WindowDimension.width - (WindowDimension.width / 7)) >  300 ?
        WindowDimension.width - (WindowDimension.width / 7) : 300;
    const HEIGHT = 300;

    const styles = StyleSheet.create({
        container: {
            width: WIDTH,
            position: 'absolute',
            left: ((WindowDimension.width - WIDTH) /2),
            backgroundColor: '#333',
            borderWidth: 1,
            borderRadius: 8,
            padding: 8,
            zIndex: 100,
            opacity: position.opacity, 
            top: position.top
        },
        containerFixedHeight: {
            width: WIDTH,
            height: HEIGHT,
            position: 'absolute',
            left: ((WindowDimension.width - WIDTH) /2),
            backgroundColor: '#333',
            borderWidth: 1,
            borderRadius: 8,
            padding: 8,
            zIndex: 100,
            opacity: position.opacity,
            top: position.top
        },
        content: {
        },
        contentFixedHeight: {
            height: HEIGHT - 70
        },
        title: {
            fontSize: 19, fontWeight: '500', color: 'white',
            padding: 4,
        },
        borderline :{
            borderWidth: 1, height: 1,
            borderColor: 'white', marginVertical: 8,
        },
        borderHorizontal: {
            borderColor: 'white', borderRightWidth: 2,
            marginTop: 6, height: 24,
        },
        buttonsContainer: {
            borderTopWidth: 2,
            borderColor: 'white',
            marginTop: 6, 
            alignItems: 'center',
            paddingTop: 4,
        },
        buttonsContainerFlexed: {
            //borderTopWidth: 2,
            //borderColor: 'white',
            flexDirection: 'row',
            marginTop: 6, 
            paddingTop: 8,
        },
        buttonCancel: {
            width: (WIDTH - 30)/2, 
        },
        buttonOK: {
            width: (WIDTH - 30)/2, 
        },
        buttonOkOnly: {
            paddingBottom: 8,
            paddingTop: 2
        },
        buttonText: {
            fontSize: 18,
            textAlign: 'center',
            color: 'lightgreen',
            paddingTop: 4,
        },
        buttonTextOK: {
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'black',
            backgroundColor: 'lightgreen',
            width: '100%',
            alignSelf: 'center',
            padding: 4,
            borderRadius: 4,
        }
    });

    //This function reposition the dialog box
    function onLayoutView(event :any) {
        const { height } = event.nativeEvent.layout;
        const top        = (WindowDimension.height - height) / 2.3;
        setPosition({opacity: 1, top: top});
    }

    //find out what are the button appear in the bottom based if that button is available or not
    function getBtnOptions() {
        if(props.ok) {
            if(props.cancel) 
                return (
                    <View style={styles.buttonsContainerFlexed}>
                        <TouchableOpacity style={styles.buttonCancel} onPress={props.cancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonOK} onPress={props.ok}>
                            <Text style={styles.buttonTextOK}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                );
            return (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={ styles.buttonOkOnly } onPress={props.ok}>
                        <Text style={styles.buttonText}>Ok</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={ styles.buttonOkOnly } onPress={props.cancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{position: 'absolute', zIndex: 90}}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    if(props.cancel)  props.cancel();
                    else if(props.ok) props.ok();
            }}>
                <View style={{
                    width: WindowDimension.width,
                    height: WindowDimension.height,
                    top: 0, backgroundColor: 'rgba(0 , 0, 15, .5)'}}>
                </View>
            </TouchableOpacity>
            <View style={props.isScrolledContent ? styles.containerFixedHeight : styles.container} onLayout={onLayoutView}>
                <View style={props.isScrolledContent ? styles.contentFixedHeight : styles.content}>
                    <Text style={styles.title}>{props.title}</Text>
                    <View style={styles.borderline}></View>
                    {
                        props.isScrolledContent ?
                        <ScrollView >
                            { props.dialogContent() }
                        </ScrollView>
                        :
                        <View>
                            { props.dialogContent() }
                        </View>
                    }
                </View>
                {
                    getBtnOptions()
                }
            </View>
        </View>
    );
}
