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

    const WIDTH     = 320;
    const HEIGHT    = 300;
    const styles = StyleSheet.create({
        container: {
            width: WIDTH,
            position: 'absolute',
            top:  ((WindowDimension.height - HEIGHT) / 2) - 70,
            left: ((WindowDimension.width - WIDTH) /2),
            backgroundColor: '#333',
            borderWidth: 1,
            borderRadius: 8,
            padding: 8,
            zIndex: 100,
        },
        containerFixedHeight: {
            width: WIDTH,
            height: HEIGHT,
            position: 'absolute',
            top:  ((WindowDimension.height - HEIGHT) / 2) - 60,
            left: ((WindowDimension.width - WIDTH) /2),
            backgroundColor: '#333',
            borderWidth: 1,
            borderRadius: 8,
            padding: 8,
            zIndex: 100,
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
            marginTop: 6, flexDirection: 'row',
            paddingTop: 2,
        },
        buttonCancel: {
            width: 280/2, 
        },
        buttonOK: {
            width: 280/2, 
        },
        buttonOkOnly: {
            width: 280,
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

    //find out what are the button appear in the bottom based if that button is available or not
    function getBtnOptions() {
        if(props.ok) {
            if(props.cancel) 
                return (
                    <View style={styles.buttonsContainer}>
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
            <View style={{
                width: WindowDimension.width, height: WindowDimension.height - 50,
                top: 0, backgroundColor: 'rgba(0 , 0, 15, .5)'}}>
            </View>
            <View style={props.isScrolledContent ? styles.containerFixedHeight : styles.container}>
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
