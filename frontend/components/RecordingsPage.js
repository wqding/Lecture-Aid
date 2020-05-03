import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


const RecordingsPage = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Button 
                onPress={() => {
                   
                }}
                title="Recordings"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        margin: 20
    }
});

export default RecordingsPage;
