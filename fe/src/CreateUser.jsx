import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_USER = gql`
  mutation CreateUser($id: ID!, $name: String!, $address: String!, $age: Int!, $gender: String!) {
    createUser(id: $id, name: $name, address: $address, age: $age, gender: $gender) {
      id
      name
      address
      age
      gender
    }
  }
`;

function CreateUser() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: '',
        age: '',
        gender: 'male'
    });

    const [createUser, { loading }] = useMutation(CREATE_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'age' ? parseInt(value) || '' : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser({
                variables: {
                    id: formData.id,
                    name: formData.name,
                    address: formData.address,
                    age: parseInt(formData.age),
                    gender: formData.gender
                }
            });
            // Reset form after successful submission
            setFormData({
                id: '',
                name: '',
                address: '',
                age: '',
                gender: 'male'
            });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="create-user-container" style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Create New User</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="name" style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Id</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="name" style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="address" style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="age" style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="1"
                        style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="gender" style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: 'white' }}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '0.75rem',
                        backgroundColor: '#4a90e2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        marginTop: '1rem',
                        fontWeight: '600',
                        transition: 'background-color 0.3s'
                    }}
                >
                    {loading ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </div>
    );
}

export default CreateUser
