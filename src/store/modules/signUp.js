import axios from "axios";

const postApi = (uri, data) => {
  return axios.post(`${process.setting.ENV_ADMIN_LOG_IN_OTU}${uri}`, data);
};

export default {
  actions: {
    signUp({ commit }, signUp) {
      const setData = {
        username: signUp.id,
        password: signUp.password,
        seller_attribute_type_id: signUp.sellerType,
        name: signUp.sellerName,
        english_name: signUp.sellerEngName,
        contact_phone: signUp.managerPhonNumber, //고객
        service_center_number: signUp.ServiceCenterPhon
      };
      return postApi(`/admin/signup`, setData);
    }
  }
};
