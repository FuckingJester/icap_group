import { useState, useEffect } from 'react';
import styles from './Main.module.css'
import axios from 'axios';

export default function Main () {
    const [users, setUsers] = useState([]);
    const [currentPage,setCurrentPage] = useState(1)
    const [nextPage, setNextPage] = useState()
    const [prevPage, setPrevPage] = useState()
    
    const nextHandle = async () =>{
        if(currentPage < 49){
            setCurrentPage(currentPage + 1)
        }
        try {
            const response = await axios.get(nextPage);
            setUsers(response.data.results);
            setNextPage(response.data.next)
            setPrevPage(response.data.previous)
        } catch (error) {
            console.error('помилка перемикання сторінки вперед')
        }

    }

    const previousHandle = async () =>{
        try {
            if(currentPage > 1){
                setCurrentPage(currentPage - 1)
            } 
            const response = await axios.get(prevPage);
            setUsers(response.data.results);
            setNextPage(response.data.next)
            setPrevPage(response.data.previous)
        } catch (error) {
            console.error('помилка перемикання сторінки вперед')
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('https://technical-task-api.icapgroupgmbh.com/api/table/');
              setUsers(response.data.results);
              setNextPage(response.data.next)
              setPrevPage(response.data.previous)
            } catch (error) {
              console.error('Помилка з отриманням даних', error);
            }
          };
        fetchData()
    }, []);
    
    const handleEdit = async (index, field, value, itemId) => {
        const newUsers = [...users];
        newUsers[index][field] = value;
        setUsers(newUsers);
        const { id, ...dataToSend } = newUsers[index]

        console.log(newUsers[index])
        await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${itemId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        })
          .then(response => response.json())
          .then(data => console.log('Data updated successfully', data))
          .catch(error => console.error('Error updating data: ', error));
      };

      return (
        <div className={styles.data__table}>
          <h1>Таблиця з даними</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Birthday Date</th>
                <th>Phone Number</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        handleEdit(index, "name", e.target.value, item.id)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.email}
                      onChange={(e) =>
                        handleEdit(index, "email", e.target.value, item.id)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.birthday_date}
                      onChange={(e) =>
                        handleEdit(
                          index,
                          "birthday_date",
                          e.target.value,
                          item.id
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.phone_number}
                      onChange={(e) =>
                        handleEdit(
                          index,
                          "phone_number",
                          e.target.value,
                          item.id
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.address}
                      onChange={(e) =>
                        handleEdit(index, "address", e.target.value, item.id)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <div onClick={previousHandle}>{'<'}</div>
            <div onClick={nextHandle}>&gt;</div>
          </div>
          <h2>{currentPage} з 49 </h2>
        </div>
      );
  };