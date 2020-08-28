import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderContainer from "../components/common/HeaderContainer";

interface ParamTypes {
  username: string;
}

function PostListPage() {
  const param = useParams<ParamTypes>();
  useEffect(() => {
    console.log("param", param);
  }, [param]);
  return (
    <div>
      <HeaderContainer />
      <div>안녕하세요</div>
    </div>
  );
}

export default PostListPage;
