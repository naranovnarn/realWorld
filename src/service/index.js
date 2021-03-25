class Api {
  _apiBase = "https://conduit.productionready.io/api/";

  getResource = async (url, option = {}) => {
    try {
      const res = await fetch(`${this._apiBase}${url}`, option);

      return await res.json();
    } catch (error) {
      const myMessage = "Request failed";
      throw new Error(`${myMessage}, ${error.message}`);
    }
  };

  getArticles = async (count = 5, page = 1, token = "") => {
    let headers;

    if (token) {
      headers = {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      };
    } else {
      headers = {
        "Content-Type": "application/json;charset=utf-8",
      };
    }

    const offset = page === 1 ? 0 : (page - 1) * 5;
    const options = {
      method: "GET",
      headers,
    };

    return await this.getResource(
      `articles?limit=${count}&offset=${offset}`,
      options
    );
  };

  getSingleArticle = async (slug, token = "") => {
    let headers;

    if (token) {
      headers = {
        "Content-Type": `application/json;charset=utf-8`,
        Authorization: `Token ${token}`,
      };
    } else {
      headers = {
        "Content-Type": `application/json;charset=utf-8`,
      };
    }
    const options = {
      method: "GET",
      headers,
    };

    return await this.getResource(`articles/${slug}`, options);
  };

  regUser = async (userData) => {
    if (!userData) {
      throw new Error("Missing user data");
    }

    const { username, email, password } = userData;

    const regUserData = {
      user: {
        username,
        email,
        password,
      },
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": `application/json;charset=utf-8`,
      },
      body: JSON.stringify(regUserData),
    };
    return await this.getResource("/users", options);
  };

  isUsernameFree = async (username) => {
    const response = await this.getResource(`profiles/${username}`);

    if (response.profile) {
      return false;
    }
    return true;
  };

  authUser = async (userData) => {
    if (!userData) {
      throw new Error("Missing user data");
    }

    const { email, password } = userData;
    const regUserData = {
      user: {
        email,
        password,
      },
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(regUserData),
    };

    return await this.getResource("users/login", options);
  };

  getCurrentUser = async (token) => {
    if (!token) {
      throw new Error("Missing user token");
    }
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
    };

    return await this.getResource("user", options);
  };

  updateUser = async (userData, token) => {
    if (!userData) {
      throw new Error("Missing user data");
    }

    const regUserData = {
      user: { ...userData },
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(regUserData),
    };
    return await this.getResource("user", options);
  };

  createArticle = async (data, token) => {
    const { body, title, description } = data;

    const tagList = [];
    for (const key in data) {
      if (key.includes("tag")) {
        tagList.push(data[key]);
      }
    }
    const articleData = { article: { body, title, description, tagList } };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": `application/json;charset=utf-8`,
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(articleData),
    };

    return await this.getResource("articles", options);
  };

  likeArticle = async (slug, token, favorite) => {
    const actionMethod = favorite ? "DELETE" : "POST";
    const options = {
      method: actionMethod,
      headers: {
        "Content-Type": `application/json;charset=utf-8`,
        Authorization: `Token ${token}`,
      },
    };
    return await this.getResource(`articles/${slug}/favorite`, options);
  };

  updateArticle = async (data, slug, token) => {
    const { body, title, description } = data;

    const tagList = [];
    for (const key in data) {
      if (key.includes("tag")) {
        tagList.push(data[key]);
      }
    }
    const articleData = { article: { body, title, description, tagList } };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": `application/json;charset=utf-8`,
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(articleData),
    };
    return await this.getResource(`articles/${slug}`, options);
  };

  deleteArticle = async (slug, token) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": `application/json;charset=utf-8`,
        Authorization: `Token ${token}`,
      },
    };
    await this.getResource(`articles/${slug}`, options);
  };
}

const api = new Api();

export default api;
