import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/common/Button";

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
      {param.username && param.username}
      리스트
      <Button>버튼</Button>
    </div>
  );
}

export default PostListPage;
