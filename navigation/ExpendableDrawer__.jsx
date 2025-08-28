import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated
} from 'react-native';
import api from '../api/api';
import OfficeList from '../data/OfficeList';
import OfficeListSingle from '../data/OfficeListSingle';
import GroupList from '../data/GroupList';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { createDesignationTable, createDesignationListTable, createVacantDesignationTable } from '../database/CreateQueries';
import { insertDataIntoDesignationTable, insertDataIntoDesignationListTable, insertDataIntoVacantTable } from '../database/InsertQueries';
import db from '../database/database';
import { useNetInfo } from "@react-native-community/netinfo";
import { getAllInfoFromTable, getAllTableName } from '../database/SelectQueries';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const tree = {
    phonebook: ['phonebook', 'dg-adg', 'admin', 'civil', 'computer', 'economic', 'fa', 'geology', 'land', 'me', 'water', 'medical', 'others'],
    offices: ['offices', 'dg', 'adg-admin', 'adg-finance', 'adg-planning', 'adg-east', 'adg-west', 'present-office'],
    apr: ['apr'],
    blood: ['blood'],
    settings: ['settings', 'theme', 'update-organogram']
}

const ExpendableDrawer = () => {
    const netInfo = useNetInfo();
    const navigation = useNavigation();
    const [activeAccordion, setActiveAccordion] = useState([]);

    const [accordinsList, setAccordinsList] = useState([]);

    const [rotateAnim] = useState(new Animated.Value(0));

    const { setcurrentTheme, themeColors, currentTheme } = useContext(ThemeContext);
    const {
        setDesignationContext,
        isAdmin,
        presentOffice,
        presentOfficeCode,
        officelevel1code,
        adminLevel,
        name,
        pmisId,
        userInfo
    } = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [desigList, setDesigList] = useState([]);
    const [desigListOthers, setDesigListOthers] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [offices, setOffices] = useState();
    const [aprData, setAprData] = useState([]);

    const [dgAdgDesig, setDgAdgDesig] = useState([]);
    const [adminDesig, setAdminDesig] = useState([]);
    const [civilDesig, setCivilDesig] = useState([]);
    const [computerDesig, setComputerDesig] = useState([]);
    const [economicDesig, setEconomicDesig] = useState([]);
    const [financeDesig, setFinanceDesig] = useState([]);
    const [landDesig, setLandDesig] = useState([]);
    const [geologyDesig, setGeologyDesig] = useState([]);
    const [waterDesig, setWaterDesig] = useState([]);
    const [mechDesig, setMechDesig] = useState([]);
    const [medicalDesig, setMedicalDesig] = useState([]);

    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'biodata':
                return <Image source={require('../assets/icons/bio-data.png')} style={styles.iconStyle} />;
            case 'desig':
                return <Image source={require('../assets/icons/designation.png')} style={styles.iconStyle} />;
            case 'dg':
                return <Image source={require('../assets/icons/dg.png')} style={styles.iconStyle} />;
            case 'admin':
                return <Image source={require('../assets/icons/admin.png')} style={styles.iconStyle} />;
            case 'computer':
                return <Image source={require('../assets/icons/computer.png')} style={styles.iconStyle} />;
            case 'land':
                return <Image source={require('../assets/icons/land.png')} style={styles.iconStyle} />;
            case 'geology':
                return <Image source={require('../assets/icons/geology.png')} style={styles.iconStyle} />;
            case 'fa':
                return <Image source={require('../assets/icons/accounts.png')} style={styles.iconStyle} />;
            case 'civil':
                return <Image source={require('../assets/icons/civil.png')} style={styles.iconStyle} />;
            case 'economic':
                return <Image source={require('../assets/icons/economic.png')} style={styles.iconStyle} />;
            case 'me':
                return <Image source={require('../assets/icons/me.png')} style={styles.iconStyle} />;
            case 'water':
                return <Image source={require('../assets/icons/water.png')} style={styles.iconStyle} />;
            case 'office':
                return <Image source={require('../assets/icons/office.png')} style={styles.iconStyle} />;
            case 'medical':
                return <Image source={require('../assets/icons/medical.png')} style={styles.iconStyle} />;
            case 'settings':
                return <Image source={require('../assets/icons/settings.png')} style={styles.iconStyle} />;
            case 'groupIcon':
                return <Image source={require('../assets/icons/groupIcon.png')} style={styles.iconStyle} />;
            case 'requestIcon':
                return <Image source={require('../assets/icons/request.png')} style={styles.iconStyle} />;
            case 'aprIcon':
                return <Image source={require('../assets/icons/apr.png')} style={styles.iconStyle} />;
            case 'staffListIcon':
                return <Image source={require('../assets/icons/staff-list.png')} style={styles.iconStyle} />;
            case 'bloodsearch':
                return <Image source={require('../assets/icons/bloodsearch.png')} style={styles.iconStyle} />;
            case 'others':
                return <Image source={require('../assets/icons/others.png')} style={styles.iconStyle} />;
            case 'developedBy':
                return <Image source={require('../assets/icons/coding.png')} style={styles.iconStyle} />;
            case 'rightArrow':
                return <Image source={require('../assets/icons/right.png')} style={styles.iconStyle} />;
            case 'arrowDown':
                return <Image source={require('../assets/icons/down.png')} style={styles.arrowIcon} />;
            case 'arrowUp':
                return <Image source={require('../assets/icons/up.png')} style={styles.arrowIcon} />;
            default:
                return null;
        }
    };

    const fetchAPRData = async () => {
        const { data: responseApr } = await api.get("getAprDetails", { params: { id: userInfo[0].id } });
        setAprData(responseApr.rows);
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            setRefreshing(false);
            const tablenames = await getAllTableName();
            const tableNames = tablenames.map((table) => table.name);
            const tableExists = tableNames.includes('designation');

            if (tableExists) {
                const designationTableContent = await getAllInfoFromTable("designation");
                setDesigList(designationTableContent);
                setDesignationContext(designationTableContent);
                const desiglistothersTableContent = await getAllInfoFromTable("designationothers");
                setDesigListOthers(desiglistothersTableContent);
            } else {
                const { data: response } = await api.get("desiglist");
                setDesigList(response.rows);
                setDesignationContext(response.rows);

                if (response.rows != 0) {
                    response.rows.forEach(async (it, index) => {
                        const desigUrl = it.desig === '001' ? "dg" : it.desig === '002' ? "adg" : "desig";
                        fetchDataAndStore(desigUrl, it.tablename, it.desig);
                    });
                }

                createDesignationListTable('designation');
                insertDataIntoDesignationListTable('designation', response.rows);

                const { data: responseOthers } = await api.get("desiglistothers");
                setDesigListOthers(responseOthers.rows);
                createDesignationListTable('designationothers');
                insertDataIntoDesignationListTable('designationothers', responseOthers.rows);
            }
        } catch (error) {
            console.error(error.message);
        }
        setIsLoading(false);
    };

    const fetchDataAndStore = async (apiUrl, tableName, desig) => {
        try {
            const { data: response } = await api.get(apiUrl, { params: { desig: desig } });
            const data = response.rows;
            await createDesignationTable(tableName);
            await insertDataIntoDesignationTable(tableName, data);
        } catch (error) {
            console.error(`Error storing data in ${tableName} table:`, error);
        }
    };

    const fetchDataAndStoreVacantData = async (tableName, desig) => {
        try {
            const { data: vacantResponse } = await api.get("vacantDesigList", { params: { desig: desig } });
            const vacantData = vacantResponse.rows;
            createVacantDesignationTable(tableName);
            insertDataIntoVacantTable(tableName, vacantData);
        } catch (error) {
            console.error(`Error storing data in ${tableName} table:`, error);
        }
    };

    useEffect(() => {
        fetchAPRData();
        fetchData();
    }, []);

    useEffect(() => {
        if (desigList) {
            setDgAdgDesig(desigList.filter((it) => (it.cadre === '00')));
            setCivilDesig(desigList.filter((it) => (it.cadre === '10' || it.cadre === '12')));
            setMechDesig(desigList.filter((it) => (it.cadre === '20')));
            setAdminDesig(desigList.filter((it) => (it.cadre === '30')));
            setFinanceDesig(desigList.filter((it) => (it.cadre === '40')));
            setWaterDesig(desigList.filter((it) => (it.cadre === '50')));
            setLandDesig(desigList.filter((it) => (it.cadre === '60')));
            setGeologyDesig(desigList.filter((it) => (it.cadre === '70')));
            setEconomicDesig(desigList.filter((it) => (it.cadre === '80')));
            setComputerDesig(desigList.filter((it) => (it.cadre === '90')));
            setMedicalDesig(desigList.filter((it) => (it.cadre === '32')));
        }
    }, [desigList]);


    const toggleAccordion = (key) => {
        setAccordinsList(prev => {
            // Find if the key is a parent
            const isParent = Object.keys(tree).includes(key);

            if (isParent) {
                // If parent already active → close all
                if (prev[0] === key) return [];
                // Else activate only the parent
                return [key];
            } else {
                // It's a child → find its parent
                const parent = Object.keys(tree).find(parentKey =>
                    tree[parentKey].includes(key)
                );

                if (!parent) return prev; // not in tree

                // If parent not active yet → activate parent + this child
                if (prev[0] !== parent) return [parent, key];

                // Parent active → toggle child
                if (prev.includes(key)) {
                    // remove child
                    console.log();

                    console.log('==========================================');
                    console.log(prev.filter(item => item !== key));

                    console.log('==========================================');

                    console.log();

                    return prev.filter(item => item !== key);
                } else {
                    // add child
                    console.log();

                    console.log('==========================================');
                    console.log([...prev, key]);

                    console.log('==========================================');
                    console.log();

                    return [...prev, key];
                }
            }
        });
    };

    const renderAccordionItem = ({ title, icon, accordionKey, children }) => {
        const isActive = activeAccordion === accordionKey;

        isActive ? console.log('isActive -', accordionKey, ' -------------------b---------- ' + isActive) : console.log('isActive -', accordionKey, ' - ' + isActive);

        return (
            <View style={styles.accordionContainer}>
                <TouchableOpacity
                    style={styles.accordionHeader}
                    onPress={() => toggleAccordion(accordionKey)}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconContainer}>
                        {renderIcon(icon)}
                    </View>
                    <Text style={styles.titlestyle}>{title}</Text>
                    <View style={styles.arrowContainer}>
                        {renderIcon(isActive ? 'arrowUp' : 'arrowDown')}
                    </View>
                </TouchableOpacity>
                {accordinsList.includes(accordionKey) && (
                    <View style={styles.accordionContent}>
                        {children}
                    </View>
                )}
            </View>
        );
    };

    const renderDesignationAccordion = ({ title, icon, accordionKey, items, onItemPress }) => {
        const isActive = activeAccordion === accordionKey;



        isActive ? console.log('isActive -', accordionKey, ' ------------------------------- ' + isActive) : console.log('isActive -', accordionKey, ' - ' + isActive);



        return (
            <View style={styles.accordionContainer}>
                <TouchableOpacity
                    style={styles.accordionHeader}
                    onPress={() => toggleAccordion(accordionKey)}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconContainer}>
                        {renderIcon(icon)}
                    </View>
                    <Text style={styles.titlestyle}>{title}</Text>
                    <View style={styles.arrowContainer}>
                        {renderIcon(isActive ? 'arrowUp' : 'arrowDown')}
                    </View>
                </TouchableOpacity>
                {accordinsList.includes(accordionKey) && (
                    <View style={styles.accordionContent}>
                        {items.map((it) => (
                            <TouchableOpacity
                                key={it.desig}
                                style={styles.designationItem}
                                onPress={() => onItemPress(it)}
                            >
                                {renderIcon('rightArrow')}
                                <Text style={styles.innerTitlestyle}>{it.designame}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            {/* Bio-data */}
            <TouchableOpacity
                style={styles.accordionHeader}
                onPress={() => navigation.navigate('Home', {})}
                activeOpacity={0.7}
            >
                <View style={styles.iconContainer}>
                    {renderIcon('biodata')}
                </View>
                <Text style={styles.titlestyle}>Bio-data</Text>
            </TouchableOpacity>


            {/* PhoneBook */}
            {adminLevel !== 'viewer' && (
                renderAccordionItem({
                    title: "PhoneBook",
                    icon: 'desig',
                    accordionKey: 'phonebook',
                    children: (
                        <>
                            {((userInfo.length != 0 && userInfo[0].int_ext == 'E') || adminLevel === 'superAdmin') && (
                                renderDesignationAccordion({
                                    title: "DG & ADG",
                                    icon: 'dg',
                                    accordionKey: 'dg-adg',
                                    items: dgAdgDesig,
                                    onItemPress: (it) => navigation.navigate('DesignationScreen', {
                                        designation: it.designame,
                                        desig_code: it.desig,
                                        title: 'Employee List',
                                        tablename: it.tablename
                                    })
                                })
                            )}

                            {renderDesignationAccordion({
                                title: "Admin",
                                icon: 'admin',
                                accordionKey: 'admin',
                                items: adminDesig,
                                onItemPress: (it) => navigation.navigate('DesignationScreen', {
                                    designation: it.designame,
                                    desig_code: it.desig,
                                    title: 'Employee List',
                                    tablename: it.tablename
                                })
                            })}

                            {renderDesignationAccordion({
                                title: "Civil",
                                icon: 'civil',
                                accordionKey: 'civil',
                                items: civilDesig,
                                onItemPress: (it) => navigation.navigate('DesignationScreen', {
                                    designation: it.designame,
                                    desig_code: it.desig,
                                    title: 'Employee List',
                                    tablename: it.tablename
                                })
                            })}

                            {renderDesignationAccordion({
                                title: "Computer",
                                icon: 'computer',
                                accordionKey: 'computer',
                                items: computerDesig,
                                onItemPress: (it) => navigation.navigate('DesignationScreen', {
                                    designation: it.designame,
                                    desig_code: it.desig,
                                    title: 'Employee List',
                                    tablename: it.tablename
                                })
                            })}

                            {renderDesignationAccordion({
                                title: "Economic",
                                icon: 'economic',
                                accordionKey: 'economic',
                                items: economicDesig,
                                onItemPress: (it) => navigation.navigate('DesignationScreen', {
                                    designation: it.designame,
                                    desig_code: it.desig,
                                    title: 'Employee List',
                                    tablename: it.tablename
                                })
                            })}

                            {renderDesignationAccordion({
                                title: "FA&A",
                                icon: 'fa',
                                accordionKey: 'fa',
                                items: financeDesig,
                                onItemPress: (it) => navigation.navigate('DesignationScreen', {
                                    designation: it.designame,
                                    desig_code: it.desig,
                                    title: 'Employee List',
                                    tablename: it.tablename
                                })
                            })}

                            {renderDesignationAccordion({
                                title: "Geology",
                                icon: 'geology',
                                accordionKey: 'geology',
                                items: geologyDesig,
                                onItemPress: (it) => navigation.navigate('DesignationScreen', {
                                    designation: it.designame,
                                    desig_code: it.desig,
                                    title: 'Employee List',
                                    tablename: it.tablename
                                })
                            })}

                            {renderDesignationAccordion({
                                title: "Land & Revenue",
                                icon: 'land',
                                accordionKey: 'land',
                                items: landDesig,
                                onItemPress: (it) => navigation.navigate('DesignationScreen', {
                                    designation: it.designame,
                                    desig_code: it.desig,
                                    title: 'Employee List',
                                    tablename: it.tablename
                                })
                            })}

                            {renderDesignationAccordion({
                                title: "Mechanical",
                                icon: 'me',
                                accordionKey: 'me',
                                items: mechDesig,
                                onItemPress: (it) => navigation.navigate('DesignationScreen', {
                                    designation: it.designame,
                                    desig_code: it.desig,
                                    title: 'Employee List',
                                    tablename: it.tablename
                                })
                            })}

                            {renderDesignationAccordion({
                                title: "Water Management",
                                icon: 'water',
                                accordionKey: 'water',
                                items: waterDesig,
                                onItemPress: (it) => navigation.navigate('DesignationScreen', {
                                    designation: it.designame,
                                    desig_code: it.desig,
                                    title: 'Employee List',
                                    tablename: it.tablename
                                })
                            })}

                            {renderDesignationAccordion({
                                title: "Medical",
                                icon: 'medical',
                                accordionKey: 'medical',
                                items: medicalDesig,
                                onItemPress: (it) => navigation.navigate('DesignationScreen', {
                                    designation: it.designame,
                                    desig_code: it.desig,
                                    title: 'Employee List',
                                    tablename: it.tablename
                                })
                            })}

                            {netInfo.isConnected && (
                                renderDesignationAccordion({
                                    title: "Others",
                                    icon: 'others',
                                    accordionKey: 'others',
                                    items: desigListOthers,
                                    onItemPress: (it) => navigation.navigate('DesignationScreenOther', {
                                        designation: it.designame,
                                        desig_code: it.desig,
                                        title: 'Employee List',
                                        tablename: it.tablename
                                    })
                                })
                            )}
                        </>
                    )
                })
            )}

            {/* Offices */}
            {netInfo.isConnected && (
                renderAccordionItem({
                    title: "Offices",
                    icon: 'office',
                    accordionKey: 'offices',
                    children: (
                        <>
                            {adminLevel !== 'viewer' ? (
                                <>
                                    {renderAccordionItem({
                                        title: "DIRECTOR GENERAL",
                                        icon: 'rightArrow',
                                        accordionKey: 'dg',
                                        children: <OfficeList lcode='01' />
                                    })}

                                    {renderAccordionItem({
                                        title: "ADG(ADMIN)",
                                        icon: 'rightArrow',
                                        accordionKey: 'adg-admin',
                                        children: <OfficeList lcode='02' />
                                    })}

                                    {renderAccordionItem({
                                        title: "ADG(FIANANCE)",
                                        icon: 'rightArrow',
                                        accordionKey: 'adg-finance',
                                        children: <OfficeList lcode='03' />
                                    })}

                                    {renderAccordionItem({
                                        title: "ADG(PLANNING)",
                                        icon: 'rightArrow',
                                        accordionKey: 'adg-planning',
                                        children: <OfficeList lcode='04' />
                                    })}

                                    {renderAccordionItem({
                                        title: "ADG(EAST)",
                                        icon: 'rightArrow',
                                        accordionKey: 'adg-east',
                                        children: <OfficeList lcode='05' />
                                    })}

                                    {renderAccordionItem({
                                        title: "ADG(WEST)",
                                        icon: 'rightArrow',
                                        accordionKey: 'adg-west',
                                        children: <OfficeList lcode='06' />
                                    })}
                                </>
                            ) : (
                                renderAccordionItem({
                                    title: presentOffice,
                                    icon: 'rightArrow',
                                    accordionKey: 'present-office',
                                    children: <OfficeListSingle lcode={officelevel1code} officeId={presentOfficeCode} />
                                })
                            )}
                        </>
                    )
                })
            )}

            {/* APR */}
            {netInfo.isConnected && (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {renderAccordionItem({
                        title: "APR",
                        icon: 'aprIcon',
                        accordionKey: 'apr',
                        children: (
                            <>
                                {aprData && aprData.length > 0 ? (
                                    aprData.map((apr) => (
                                        <View key={apr.APRID} style={styles.aprItemContainer}>
                                            <TouchableOpacity
                                                style={styles.aprItem}
                                                onPress={() => {
                                                    navigation.navigate('AprScreen', {
                                                        id: pmisId,
                                                        officecode: presentOfficeCode,
                                                        individualOrOffice: true,
                                                        recStatus: "C",
                                                        name: presentOffice,
                                                        apr: apr
                                                    });
                                                }}
                                            >
                                                <Text style={styles.aprText}>
                                                    {apr?.year} ({apr?.start} - {apr?.end})
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                ) : (
                                    <View style={styles.noAprContainer}>
                                        <Text style={styles.noAprText}>
                                            No APR data available
                                        </Text>
                                    </View>
                                )}
                            </>
                        )
                    })}
                </View>
            )}

            {/* Blood Search */}
            {netInfo.isConnected && (
                renderAccordionItem({
                    title: "Blood Search",
                    icon: 'bloodsearch',
                    accordionKey: 'blood-search',
                    children: (
                        <>
                            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bloodType) => (
                                <TouchableOpacity
                                    key={bloodType}
                                    style={styles.bloodItem}
                                    onPress={() => {
                                        navigation.navigate('BloodScreen', {
                                            designation: bloodType,
                                            desig_code: bloodType.replace('+', 'POS').replace('-', 'NEG'),
                                            title: 'Employee List',
                                            tablename: 'BLOODTABLE'
                                        })
                                    }}
                                >
                                    <Text style={{ color: '#000080' }}>➥</Text>
                                    <Text style={styles.bloodText}>{bloodType}</Text>
                                </TouchableOpacity>
                            ))}
                        </>
                    )
                })
            )}

            {/* Settings */}
            {renderAccordionItem({
                title: "Settings",
                icon: 'settings',
                accordionKey: 'settings',
                children: (
                    <>
                        <TouchableOpacity
                            style={styles.settingsItem}
                            onPress={() => navigation.navigate('ChangePasswordScreen')}
                        >
                            {renderIcon('rightArrow')}
                            <Text style={styles.settingsText}>Change Password</Text>
                        </TouchableOpacity>

                        {renderAccordionItem({
                            title: "Theme",
                            icon: 'rightArrow',
                            accordionKey: 'theme',
                            children: (
                                <View style={styles.themeContainer}>
                                    {[0, 3, 6, 9].map((index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.themeButton, { backgroundColor: themeColors[index] }]}
                                            onPress={() => setcurrentTheme(themeColors[index])}
                                        />
                                    ))}
                                </View>
                            )
                        })}

                        {renderAccordionItem({
                            title: "Update Organogram",
                            icon: 'rightArrow',
                            accordionKey: 'update-organogram',
                            children: (
                                <TouchableOpacity
                                    style={styles.updateOrganogramButton}
                                    onPress={() => { }}
                                >
                                    <Text style={styles.updateOrganogramText}>Update Organogram</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </>
                )
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    accordionContainer: {
        marginBottom: 1,
        backgroundColor: 'white',
    },
    accordionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    iconContainer: {
        marginRight: 16,
    },
    arrowContainer: {
        marginLeft: 'auto',
    },
    arrowIcon: {
        width: 16,
        height: 16,
    },
    accordionContent: {
        paddingLeft: 32,
        backgroundColor: 'white',
    },
    titlestyle: {
        fontWeight: "bold",
    },
    innerTitlestyle: {
        fontWeight: "bold",
        fontSize: width * 0.036,
        marginLeft: 8,
    },
    designationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 16,
    },
    updateAprButton: {
        backgroundColor: '#0069C4',
        borderRadius: height * 0.005,
        paddingVertical: 4,
        paddingHorizontal: 8,
        height: height * 0.022,
        justifyContent: 'center',
        width: height * 0.1,
        marginLeft: 20,
        marginBottom: 4,
    },
    updateAprText: {
        color: 'white',
        fontSize: height * 0.015,
        fontStyle: 'italic',
        fontWeight: '700',
    },
    aprItemContainer: {
        flexDirection: 'row',
    },
    aprItem: {
        height: width * 0.1,
        width: width * 0.4,
        backgroundColor: '#0069C420',
        justifyContent: 'center',
        margin: width * 0.003,
        borderRadius: width * 0.01,
        marginLeft: width * 0.1,
    },
    aprText: {
        color: 'black',
        fontWeight: '700',
        textAlign: 'center',
    },
    noAprContainer: {
        paddingLeft: '30%',
    },
    noAprText: {
        color: '#666',
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: '600',
    },
    bloodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginLeft: width * 0.05,
    },
    bloodText: {
        fontWeight: "bold",
        marginLeft: 8,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginLeft: width * 0.031,
    },
    settingsText: {
        fontWeight: "bold",
        marginLeft: 8,
    },
    themeContainer: {
        flexDirection: 'row',
        height: height * 0.05,
        paddingTop: 0,
        marginLeft: width * 0.1,
        margin: 1,
    },
    themeButton: {
        height: width * 0.080,
        width: width * 0.080,
        marginRight: width * 0.015,
        borderRadius: width * 0.05,
    },
    updateOrganogramButton: {
        backgroundColor: '#0069C4',
        borderRadius: height * 0.005,
        marginLeft: width * 0.1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    updateOrganogramText: {
        padding: 10,
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: width * 0.036,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});

export default ExpendableDrawer;