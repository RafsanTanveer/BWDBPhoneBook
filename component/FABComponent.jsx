import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { FAB, Portal } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import React, { useContext, useEffect, useState } from "react";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const FABComponent = () => {

    const { currentTheme, currentSelectedIds, setCurrentSelectedIds } = useContext(ThemeContext);

    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;




    const bulkEmail = () => {


        const emailNoList = []


        currentSelectedIds.map((itemId) => (
            filteredData.map((itemData) => {
                if (itemId === itemData.id)
                    emailNoList.push(itemData.email)
            })
        ))


        console.log(emailNoList);


    }


    const bulkSMS = () => {

        const mobileNoList = []


        currentSelectedIds.map((itemId) => (
            filteredData.map((itemData) => {
                if (itemId === itemData.id)
                    mobileNoList.push(itemData.mobile)
            })
        ))



        console.log(mobileNoList);



    }


    return (
        // <Portal.Host>
        <Portal style={{ zIndex :1000}}>
            <FAB.Group
                fabStyle={{ backgroundColor: `${currentTheme}`, color: 'white', marginBottom: height * .045, padding: 0, }}
                color='white'
                // backdropColor={'#FFF' + '60'}
                open={open}
                visible
                icon={open ? 'close' : 'plus'}
                actions={[

                    {
                        style: { backgroundColor: `${currentTheme}`, color: 'white' },
                        icon: 'export',
                        fabStyle: { color: 'white' },
                        label: 'Export',
                        onPress: () => console.log('Pressed star'),
                    },
                    {
                        style: { backgroundColor: `${currentTheme}` },
                        icon: 'email',
                        label: 'Email',
                        onPress: () => bulkEmail(),
                    },
                    {
                        style: { backgroundColor: `${currentTheme}` },
                        icon: 'message',
                        label: 'Message',
                        onPress: () => bulkSMS(),
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        // do something if the speed dial is open
                    }
                }}
            />
        </Portal>
        // </Portal.Host>
    )
}

export default FABComponent

const styles = StyleSheet.create({})