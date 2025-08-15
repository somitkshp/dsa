import React, { useState } from 'react';

const ITRForm = () => {
    const [formData, setFormData] = useState({
        grossSalary: '',
        deductions80c: '',
    });

    const { grossSalary, deductions80c } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('/api/itr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>ITR Form (Salaried)</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Gross Salary:</label>
                    <input
                        type="number"
                        placeholder="Enter your gross salary"
                        name="grossSalary"
                        value={grossSalary}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label>Deductions under Section 80C:</label>
                    <input
                        type="number"
                        placeholder="Enter your 80C deductions"
                        name="deductions80c"
                        value={deductions80c}
                        onChange={onChange}
                        required
                    />
                </div>
                <input type="submit" value="Save ITR Data" />
            </form>
        </div>
    );
};

export default ITRForm;
