import { Checkbox, CheckboxProps } from "react-native-paper";

interface CheckboxComponentProps extends CheckboxProps {
  isChecked: boolean;
}

export default function CheckBoxComponent(props: CheckboxComponentProps) {

  return(
    <Checkbox
      status={props.isChecked ? 'checked' : 'unchecked'}
    />
  )
}