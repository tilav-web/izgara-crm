import { useState } from "react";

export default function usePolishPhoneNumber() {
    const [phone, setPhone] = useState<string>("88 927 27 03");

    const polishInput = (input: string) => {
        if (!input) {
            setPhone("");
            return;
        }
        let digits = input.replace(/\D/g, "");

        if (digits.length > 9) {
            digits = digits.slice(0, 9);
        }

        if (digits.length <= 2) {
            setPhone(digits);
            return;
        } else if (digits.length <= 5) {
            setPhone(`${digits.slice(0, 2)} ${digits.slice(2)}`);
            return;
        } else if (digits.length <= 7) {
            setPhone(`${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`);
            return;
        } else {
            setPhone(`${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`);
            return;
        }
    }

    return { phone, polishInput, polishPhoneNumber: `+998${phone.split(' ').join('')}` };
}
