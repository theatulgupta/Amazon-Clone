import React from 'react';
import { Text } from 'react-native';

export default function Divider({
    borderWidth = 2,
    marginTop = 15
}) {
    return (
        <Text
            style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: borderWidth,
                marginTop: marginTop,
            }}
        />
    );
}
