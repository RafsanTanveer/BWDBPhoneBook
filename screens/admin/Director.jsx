import React from "react";
import DataRender from "../../data/DataRender";

const Director = ({ route, navigation }) => {

    const [value, onChangeText] = React.useState(route.params.title);

    React.useEffect(() => {
        navigation.setOptions({
            title: value === '' ? 'No title' : value,
        });
    }, [navigation, value]);

    return (
        <DataRender  designation='Director (Admin)' desig_code="012" tablename='diradmin'/>

    )
}
export default Director