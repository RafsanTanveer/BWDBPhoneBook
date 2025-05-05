import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const labelMap = {
    year: 'বিবেচ্য সময়',
    start: 'বিবেচ্য সময় শুরু',
    APRID: 'এপিআর আইডি',
    EMPLOYEE: 'কর্মচারী আইডি',
    NAME: 'নাম',
    CADRE: 'শ্রেনীগুচ্ছ',
    POST_PRST: 'বর্তমান পদ',
    POST_CONSIDER: 'বিবেচ্য সময়ে পদবী',
    CHARGE_PRST: 'বর্তমান দায়িত্ব',
    CHARGE_CONSIER: 'বিবেচ্য সময়ে দায়িত্ব',
    OFFICE_PRST: 'বর্তমান অফিস',
    OFFICE_CONSIDER: 'বিবেচ্য সময়ে অফিস',
    DURATION_START: 'বিবেচ্য বৎসর শুরু',
    DURATION_END: 'বিবেচ্য বৎসর শেষ',
    REPORTER_PMISID: 'প্রতিস্বাক্ষরকারীর আইডি',
    REPORTER_NAME: 'প্রতিস্বাক্ষরকারীর নাম',
    REPORTER_DESIGNATION: 'প্রতিস্বাক্ষরকারীর পদবি',
    REPORTER_CHARGE: 'প্রতিস্বাক্ষরকারীর দায়িত্ব',
    REPORTER_OFFICE: 'প্রতিস্বাক্ষরকারীর অফিস',
    COUNTERSIGNATORY_PMISID: 'প্রতিবেদনকারীর আইডি',
    COUNTERSIGNATORY_NAME: 'প্রতিবেদনকারীর নাম',
    COUNTERSIGNATORY_DESIGNATION: 'প্রতিবেদনকারীর পদবি',
    COUNTERSIGNATORY_CHARGE: 'প্রতিবেদনকারীর দায়িত্ব',
    COUNTERSIGNATORY_OFFICE: 'প্রতিবেদনকারীর অফিস',
    UPDATED_DATE: 'হালনাগাদ তারিখ',
    UPDATED_BY: 'হালনাগাদকরণকারী',
};

const hiddenFields = [
    'year',
    'start',
    'end',
    'APRID',
    'MARKS_FROM_REPORTER',
    'MARKS_FROM_CONTERSIGNATORY',
    'COMMENTS_FROM_REPORTER',
    'COMMENTS_FROM_COUNTERSIGNATORY',
];

// Date format function
const formatDate = (value) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
        const [year, month, day] = value.split('T')[0].split('-');
        return `${day}-${month}-${year}`;
    }
    return value;
};

const AprScreen = ({ route }) => {
    const { apr } = route.params || {};

    if (!apr) {
        return (
            <View style={styles.centered}>
                <Text style={styles.error}>APR তথ্য পাওয়া যায়নি।</Text>
            </View>
        );
    }

    // Grouping keys
    const generalKeys = Object.keys(apr).filter(k =>
        !k.startsWith('REPORTER_') &&
        !k.startsWith('COUNTERSIGNATORY_') &&
        !hiddenFields.includes(k)
    );

    const reporterKeys = Object.keys(apr).filter(k => k.startsWith('REPORTER_'));
    const counterKeys = Object.keys(apr).filter(k => k.startsWith('COUNTERSIGNATORY_'));

    return (
        <ScrollView style={styles.container}>
            <View style={styles.periodContainer}>
                <Text style={styles.header}>এপিআর বিবরণী</Text>
                <View style={styles.periodBox}>
                    <Text style={styles.periodText}>বিবেচ্য বছর: {apr.year}</Text>
                    <Text style={styles.periodRange}>({apr.start} - {apr.end})</Text>
                </View>
            </View>

            {/* General Info */}
            <View style={styles.card}>
                {generalKeys.map(key => (
                    <View key={key} style={styles.row}>
                        <Text style={styles.label}>{labelMap[key] || key}</Text>
                        <Text style={styles.value}>{formatDate(apr[key]) || '—'}</Text>
                    </View>
                ))}
            </View>

            {/* Reporter Info */}
            <Text style={styles.sectionTitle}>প্রতিস্বাক্ষরকারীর তথ্য</Text>
            <View style={styles.card}>
                {reporterKeys.map(key => (
                    <View key={key} style={styles.row}>
                        <Text style={styles.label}>{labelMap[key] || key}</Text>
                        <Text style={styles.value}>{formatDate(apr[key]) || '—'}</Text>
                    </View>
                ))}
            </View>

            {/* Countersignatory Info */}
            <Text style={styles.sectionTitle}>প্রতিবেদনকারীর তথ্য</Text>
            <View style={styles.card}>
                {counterKeys.map(key => (
                    <View key={key} style={styles.row}>
                        <Text style={styles.label}>{labelMap[key] || key}</Text>
                        <Text style={styles.value}>{formatDate(apr[key]) || '—'}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f6fa',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontSize: 16,
        color: 'red',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2f3542',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.6,
        borderBottomColor: '#ecf0f1',
        paddingVertical: 10,
    },
    label: {
        fontWeight: 'bold',
        color: '#2c3e50',
        width: '45%',
        fontSize: 14,
    },
    value: {
        color: '#34495e',
        width: '50%',
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e272e',
        marginTop: 8,
        marginBottom: 8,
    },
    periodContainer: {
        borderRadius: 12,
        marginBottom: 16,
        alignItems: 'center',
    },
    periodBox: {
        marginTop: 8,
        backgroundColor: '#c7ecee',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    periodText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#130f40',
        textAlign: 'center',
    },
    periodRange: {
        fontSize: 14,
        color: '#535c68',
        textAlign: 'center',
        marginTop: 4,
    },
});

export default AprScreen;
