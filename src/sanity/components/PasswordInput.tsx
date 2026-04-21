import { useCallback, useState } from "react";
import { TextInput, Button, Flex } from "@sanity/ui";
import { EyeOpenIcon, EyeClosedIcon } from "@sanity/icons";
import { set, unset, type StringInputProps } from "sanity";

export default function PasswordInput(props: StringInputProps) {
  const { value, onChange, elementProps } = props;
  const [visible, setVisible] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.currentTarget.value;
      onChange(next ? set(next) : unset());
    },
    [onChange]
  );

  return (
    <Flex gap={2} align="center">
      <TextInput
        {...elementProps}
        type={visible ? "text" : "password"}
        value={value ?? ""}
        onChange={handleChange}
        style={{ flex: 1 }}
      />
      <Button
        icon={visible ? EyeClosedIcon : EyeOpenIcon}
        mode="ghost"
        onClick={() => setVisible((v) => !v)}
        title={visible ? "Verbergen" : "Tonen"}
      />
    </Flex>
  );
}
