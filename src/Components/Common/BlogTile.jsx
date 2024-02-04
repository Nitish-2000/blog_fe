/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function BlogTile({blog}) {
  return   (
     <Card sx={{ bgcolor: 'text.secondary',ml:35,mr:35,mb:5,mt:5 }} >
  <CardActionArea>
    <CardMedia
      component="img"
      height="390"
      image={blog.imageUrl}
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {blog.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
       {blog.description}
       </Typography>
    </CardContent>
  </CardActionArea>
</Card>

  )
}

export default BlogTile