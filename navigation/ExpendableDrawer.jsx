import * as React from "react";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { Divider, List } from 'react-native-paper';


const ExpendableDrawer = () => {

    const navigation = useNavigation();
    const [expendedList, setexpendedList] = React.useState([])

    const handlePress = (no) => {
        const arr = []
        for (let i = 0; i < 9; i++) {
            if (i == no) expendedList[no] ? arr[i] = false : arr[i] = true;
            else arr[i] = false;
        }
        setexpendedList(arr);
    }


    return (
        <>
            <List.Section >
                <List.Accordion
                    style={{ marginVertical: -8, backgroundColor: "#C7C0DA" }}
                    title="DG & ADG"
                    left={props => <List.Icon {...props} icon="meteor" />}
                    expanded={expendedList[8]}
                    onPress={() => handlePress(8)}  >
                    <List.Item left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -10, }} title="Director General" />
                    <List.Item style={{ marginLeft: -30, marginTop: -10 }} title="Addl. Director General" />

                </List.Accordion>

            </List.Section>
            <Divider />

            {/******************************************* designation wise **************************************/}


            <List.Section title="" style={{ backgroundColor: "#C7C0DA" }}>
                <List.Accordion
                    style={{ marginVertical: -8, backgroundColor: "#C7C0DA" }}
                    title="Designation wise"
                    left={props => <List.Icon {...props} icon="meteor" />}
                    expanded={expendedList[10]}
                    onPress={() => handlePress(10)} >

                    <List.Accordion
                        style={{ marginVertical: -8, backgroundColor: "#C7C0DA" }}
                        title="Accounts"
                        left={props => <List.Icon {...props} icon="meteor" />}
                        expanded={expendedList[0]}
                        onPress={() => handlePress(0)} >
                        <List.Item style={{ marginLeft: -30, marginTop: -10 }} title="Director" />
                        <List.Item style={{ marginLeft: -30, marginTop: -10 }} title="Deputy Director" />
                        <List.Item style={{ marginLeft: -30, marginTop: -10 }} title="Assistant Director" />

                    </List.Accordion>

                    <List.Accordion
                        style={{ marginVertical: -8, backgroundColor: "#C7C0DA" }}
                        title="Admin"
                        left={props => <List.Icon {...props} icon="meteor" />}
                        expanded={expendedList[1]}
                        onPress={() => handlePress(1)} >

                        <List.Item onPress={() => { navigation.navigate('Director (Admin)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Director (Admin)" />
                        <List.Item onPress={() => { navigation.navigate('Deputy Director (Admin)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Deputy Director (Admin)" />
                        <List.Item onPress={() => { navigation.navigate('Asst. Director (Admin)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Asst. Director (Admin)" />

                    </List.Accordion>

                    <List.Accordion
                        style={{ marginVertical: -8, backgroundColor: "#C7C0DA" }}
                        title="Civil"
                        left={props => <List.Icon {...props} icon="meteor" />}
                        expanded={expendedList[2]}
                        onPress={() => handlePress(2)}
                    >
                        <List.Item onPress={() => { navigation.navigate('Chief Engineer (Civil)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Chief Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Addl. Chief Engineer (Civil)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Addl. Chief Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Superintendent Engineer (Civil)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Superintendent Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Executive Engineer (Civil)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Executive Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Sub-divisional Engineer (Civil)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Sub-divisional Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Assistant Engineer (Civil)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Engineer (Civil)" />
                    </List.Accordion>
                    <List.Accordion
                        style={{ marginVertical: -8, backgroundColor: "#C7C0DA" }}
                        title="Computer"
                        left={props => <List.Icon {...props} icon="meteor" />}
                        expanded={expendedList[3]}
                        onPress={() => handlePress(3)}
                    >
                        <List.Item onPress={() => { navigation.navigate('Senior System Analyst') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Senior System Analyst" />
                        <List.Item onPress={() => { navigation.navigate('System Analyst') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="System Analyst" />

                        <List.Item onPress={() => { navigation.navigate('Programmer') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Programmer" />
                        <List.Item onPress={() => { navigation.navigate('Assistant Programmer') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Programmer" />


                    </List.Accordion>

                    <List.Accordion
                        style={{ marginVertical: -8, backgroundColor: "#C7C0DA" }}
                        title="FA&A"
                        left={props => <List.Icon {...props} icon="meteor" />}
                        expanded={expendedList[4]}
                        onPress={() => handlePress(4)}
                    >
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>

                    <List.Accordion
                        style={{ marginVertical: -8, backgroundColor: "#C7C0DA" }}
                        title="Geology"
                        left={props => <List.Icon {...props} icon="meteor" />}
                        expanded={expendedList[5]}
                        onPress={() => handlePress(5)}
                    >
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>

                    <List.Accordion
                        style={{ marginVertical: -8, backgroundColor: "#C7C0DA" }}
                        title="Land & Revenue"
                        left={props => <List.Icon {...props} icon="meteor" />}
                        expanded={expendedList[6]}
                        onPress={() => handlePress(6)}
                    >
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>

                    <List.Accordion
                        style={{ marginVertical: -8, backgroundColor: "#C7C0DA" }}
                        title="ME"
                        left={props => <List.Icon {...props} icon="meteor" />}
                        expanded={expendedList[7]}
                        onPress={() => handlePress(7)}
                    >
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>

                </List.Accordion>
            </List.Section>
            <Divider />

            {/******************************************* designation wise **************************************/}


            {/******************************************* office wise **************************************/}
            <List.Section >
                <List.Accordion
                    style={{ marginVertical: -8, backgroundColor: "#C7C0DA" }}
                    title="Offices"
                    left={props => <List.Icon {...props} icon="meteor" />}
                    expanded={expendedList[11]}
                    onPress={() => handlePress(11)}  >
                    <List.Item left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -10, }} title="Director General" />
                    <List.Item style={{ marginLeft: -30, marginTop: -10 }} title="Addl. Director General" />

                </List.Accordion>

            </List.Section>

            {/******************************************* office wise **************************************/}

           
        </>
    );
};


export default ExpendableDrawer;