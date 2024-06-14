import axios from 'axios';

const JSON_SERVER_HOST = "https://grape-cold-zydeco.glitch.me";

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`); // 수정된 부분
    return response.data; // 데이터를 반환
  } catch (err) {
    alert("뭔가 잘못된듯?");
    console.error(err); // 오류 로그 출력
  }
};
export const getExpense = async ({ queryKey }) => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses/${queryKey[1]}`); // 수정된 부분
    return response.data; // 데이터를 반환
  } catch (err) {
    alert("뭔가 잘못된듯?");
    console.error(err); // 오류 로그 출력
  }
};

export const postExpense = async (newExpense) => {
    try { 
      const { data } = await axios.post(
        `${JSON_SERVER_HOST}/expenses`
        , newExpense
    );
      return data;
    } catch (err) {
      console.error(err); // 오류 로그 출력
      alert("뭔가 잘못된듯?");
    }
}  

export const putExpense = async (updatedExpense) => {
  const {id, ...rest} = updatedExpense;
  try {
    const { data } = await axios.put(
      `${JSON_SERVER_HOST}/expenses/${id}`
     , rest
    );
    return data;
  } catch (err) {
    console.error(err); // 오류 로그 출력
    alert("뭔가 잘못된듯?");
  }

}
export const deleteExpense = async (id) => {
  try {
    const { data } = await axios.delete(
      `${JSON_SERVER_HOST}/expenses/${id}`
    );
    return data;
  } catch (err) {
    console.error(err); // 오류 로그 출력
    alert("뭔가 잘못된듯?");
  }

}