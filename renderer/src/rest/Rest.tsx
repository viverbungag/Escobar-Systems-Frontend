import axios from "axios";
import { toast } from "react-toastify";

class Rest {
  get(url: string, handleSuccessAction: Function) {
    axios
      .get(url)
      .then(function (response) {
        if (response.status === 200) {
          handleSuccessAction(response.data);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  getWithPagination(
    url: string,
    body: Object,
    handleSuccessAction: Function,
    handleTotalPagesLoad: Function
  ) {
    axios
      .post(url, body)
      .then(function (response) {
        if (response.status === 200) {
          handleSuccessAction(response.data.contents);
          handleTotalPagesLoad(response.data.totalCount);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  add(
    url: string,
    body: Object,
    handleSuccessAction: Function,
    successMessage: string
  ) {
    axios
      .post(url, body)
      .then(function (response) {
        if (response.status === 200) {
          handleSuccessAction();
          toast.success(successMessage);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  update(
    url: string,
    body: Object,
    handleSuccessAction: Function,
    successMessage: string
  ) {
    axios
      .put(url, body)
      .then(function (response) {
        if (response.status === 200) {
          handleSuccessAction();
          toast.success(successMessage);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  inactivate(
    url: string,
    body: Object,
    handleSuccessAction: Function,
    successMessage: string
  ) {
    axios
      .post(url, body)
      .then(function (response) {
        if (response.status === 200) {
          handleSuccessAction();
          toast.success(successMessage);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  activate(
    url: string,
    body: Object,
    handleSuccessAction: Function,
    successMessage: string
  ) {
    axios
      .post(url, body)
      .then(function (response) {
        if (response.status === 200) {
          handleSuccessAction();
          toast.success(successMessage);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  login(
    url: string,
    body: Object,
    handleSuccessAction: Function,
    successMessage: string
  ) {
    axios
      .post(url, body)
      .then(function (response) {
        if (response.status === 200) {
          handleSuccessAction(response.data.employeeName);
          toast.success(successMessage);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  print(
    url: string,
    body: Object,
    handleSuccessAction: Function,
    successMessage: string
  ) {
    axios
      .post(url, body)
      .then(function (response) {
        if (response.status === 200) {
          handleSuccessAction();
          toast.success(successMessage);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }
}

export default Rest;
